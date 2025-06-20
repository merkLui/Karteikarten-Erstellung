import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Check authentication first
    const user = await verifyAuth();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userInstructions = formData.get('userInstructions') as string;

    // Input validation
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // File size validation (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    // File type validation
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // User instructions validation
    if (userInstructions && userInstructions.length > 500) {
      return NextResponse.json(
        { error: 'Instructions too long. Maximum 500 characters' },
        { status: 400 }
      );
    }

    // API key validation
    if (!process.env.API_KEY) {
      console.error('API_KEY not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create form data for external API
    const apiFormData = new FormData();
    apiFormData.append('file', file);
    if (userInstructions) {
      // API expects 'user_instructions', not 'userInstructions'
      apiFormData.append('user_instructions', userInstructions);
    }

    // Call external API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/generate-stream`,
      {
        method: 'POST',
        headers: {
          'X-API-Key': process.env.API_KEY!,
        },
        body: apiFormData,
      }
    );

    if (!response.ok) {
      console.error(`API responded with status ${response.status}`);
      const responseText = await response.text();
      console.error('Response body:', responseText);
      throw new Error(`API responded with status ${response.status}: ${responseText}`);
    }

    // Stream the response back to client
    const stream = new ReadableStream({
      start(controller) {
        const reader = response.body?.getReader();
        
        function pump(): Promise<void> {
          return reader!.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            return pump();
          });
        }
        
        return pump();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        // Security headers
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    });
  } catch (error) {
    console.error('Stream error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}