import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userInstructions = formData.get('userInstructions') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create form data for external API
    const apiFormData = new FormData();
    apiFormData.append('file', file);
    if (userInstructions) {
      // API expects 'user_instructions', not 'userInstructions'
      apiFormData.append('user_instructions', userInstructions);
    }

    // Debug logging
    console.log('API_KEY available:', !!process.env.API_KEY);
    console.log('API_KEY length:', process.env.API_KEY?.length);
    console.log('API_KEY first/last chars:', process.env.API_KEY ? `${process.env.API_KEY.slice(0, 3)}...${process.env.API_KEY.slice(-3)}` : 'undefined');
    console.log('API_URL:', process.env.NEXT_PUBLIC_API_URL);
    
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