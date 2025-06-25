'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Flashcard, StreamResponse } from '@/types/api';
import FileUpload from '@/components/FileUpload';
import ProgressDisplay from '@/components/ProgressDisplay';
import FlashcardDisplay from '@/components/FlashcardDisplay';
import GlowButton from '@/components/GlowButton';
import ParticleBackground from '@/components/ParticleBackground';

export default function GeneratePage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userInstructions, setUserInstructions] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Process stream data - defined before useEffect to avoid hook order issues
  const processStream = useCallback(async (response: Response) => {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    if (!reader) {
      throw new Error('No response body');
    }

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim()) {
          try {
            const data: StreamResponse = JSON.parse(line);
            
            switch (data.type) {
              case 'progress':
                if (data.percent !== undefined) {
                  setProgress(data.percent);
                }
                break;
              case 'card':
                if (data.question && data.answer) {
                  const newCard: Flashcard = {
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    question: data.question,
                    answer: data.answer,
                    createdAt: new Date(),
                  };
                  setFlashcards(prev => [...prev, newCard]);
                }
                break;
              case 'error':
                throw new Error(data.message || 'Processing error');
              case 'done':
                setIsProcessing(false);
                setProgress(100);
                break;
            }
          } catch (parseError) {
            console.error('Failed to parse stream data:', parseError);
          }
        }
      }
    }
  }, []);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-cache'
        });
        
        if (!response.ok) {
          router.push('/login');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;

    setError(null);
    setIsProcessing(true);
    setProgress(0);
    setFlashcards([]);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      if (userInstructions.trim()) {
        formData.append('userInstructions', userInstructions.trim());
      }

      const response = await fetch('/api/generate-stream', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await processStream(response);
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  const exportToCSV = () => {
    if (flashcards.length === 0) return;

    const csvContent = flashcards.map(card => [
      card.question,
      card.answer
    ]).map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `flashcards-${Date.now()}.csv`;
    link.click();
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6"
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors group"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </nav>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="glow-text">AI Flashcard</span>
            <br />
            <span className="text-white">Generator</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload your PDF and let AI create intelligent flashcards in real-time
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="glassmorphism glow-border rounded-2xl p-8">
            <FileUpload
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
              disabled={isProcessing}
            />
            
            <div className="mt-6">
              <Label htmlFor="instructions" className="text-white mb-2 block">
                Custom Instructions (Optional)
              </Label>
              <Textarea
                id="instructions"
                placeholder="e.g., Focus on key concepts, create multiple choice questions, include diagrams..."
                value={userInstructions}
                onChange={(e) => setUserInstructions(e.target.value)}
                disabled={isProcessing}
                className="min-h-[100px] bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <GlowButton
                onClick={handleGenerate}
                disabled={!selectedFile || isProcessing}
                className="group flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>{isProcessing ? 'Generating...' : 'Generate Flashcards'}</span>
              </GlowButton>
            </div>
          </div>
        </motion.div>

        {/* Progress Display */}
        {(isProcessing || progress > 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <ProgressDisplay progress={progress} isProcessing={isProcessing} />
          </motion.div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300"
          >
            <h3 className="font-semibold mb-2">Error</h3>
            <p>{error}</p>
          </motion.div>
        )}

        {/* Flashcards Display */}
        {flashcards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">
              Generated Flashcards ({flashcards.length})
            </h2>
            <FlashcardDisplay cards={flashcards} onExportCSV={exportToCSV} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
