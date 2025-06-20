'use client';

import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Loader2, Zap } from 'lucide-react';

interface ProgressDisplayProps {
  progress: number;
  isProcessing: boolean;
}

export default function ProgressDisplay({ progress, isProcessing }: ProgressDisplayProps) {
  if (!isProcessing && progress === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto p-6 glassmorphism glow-border rounded-2xl"
    >
      <div className="flex items-center justify-center mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="mr-3"
        >
          <Zap className="w-6 h-6 text-purple-400" />
        </motion.div>
        <h3 className="text-xl font-bold text-white">
          Processing Your PDF...
        </h3>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="ml-3"
        >
          <Loader2 className="w-6 h-6 text-blue-400" />
        </motion.div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Progress</span>
          <span className="text-purple-400 font-bold">{progress}%</span>
        </div>
        
        <Progress 
          value={progress} 
          className="h-3 bg-gray-800 rounded-full overflow-hidden"
        />
        
        <motion.div
          className="text-center text-sm text-gray-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          AI is analyzing your document and creating flashcards...
        </motion.div>
      </div>
    </motion.div>
  );
}