'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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

    const csvContent = [
      ['Question', 'Answer', 'Created'],
      ...flashcards.map(card => [
        card.question,
        card.answer,
        card.createdAt.toLocaleDateString()
      ])
    ].map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `flashcards-${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6"
      >
        <nav className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors group"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </nav>
      </motion.header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 px-6 py-12 space-y-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="glow-text">Generate</span> Flashcards
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-8"
          >
            Upload your PDF and let AI create intelligent flashcards for you
          </motion.p>
        </div>

        {/* File Upload Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FileUpload
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
            disabled={isProcessing}
          />
        </motion.section>

        {/* Instructions Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <Label htmlFor="instructions" className="text-lg font-medium text-white">
            Custom Instructions (Optional)
          </Label>
          <Textarea
            id="instructions"
            value={userInstructions}
            onChange={(e) => setUserInstructions(e.target.value)}
            placeholder="e.g., Focus on key definitions, create multiple choice questions, emphasize historical dates..."
            className="min-h-24 glassmorphism border-gray-600 text-white placeholder-gray-400 resize-none focus:glow-border"
            disabled={isProcessing}
          />
          <p className="text-sm text-gray-400">
            Provide specific instructions to customize your flashcards
          </p>
        </motion.section>

        {/* Generate Button */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <GlowButton
            onClick={handleGenerate}
            disabled={!selectedFile || isProcessing}
            className="text-xl px-12 py-6"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            {isProcessing ? 'Processing...' : 'Generate Flashcards'}
          </GlowButton>
        </motion.section>

        {/* Progress Display */}
        <ProgressDisplay progress={progress} isProcessing={isProcessing} />

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-center"
          >
            <p className="font-medium">Error: {error}</p>
          </motion.div>
        )}

        {/* Flashcards Display */}
        <FlashcardDisplay cards={flashcards} onExportCSV={exportToCSV} />
      </motion.main>
    </div>
  );
}