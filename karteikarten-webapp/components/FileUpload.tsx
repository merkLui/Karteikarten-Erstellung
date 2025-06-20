'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  disabled?: boolean;
}

export default function FileUpload({ onFileSelect, selectedFile, disabled }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (file.type !== 'application/pdf') {
      return 'Please select a PDF file';
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return 'File size must be less than 10MB';
    }
    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onFileSelect(file);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect, disabled]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setError(null);
    onFileSelect(null as any);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <AnimatePresence>
        {!selectedFile ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card
              className={cn(
                'relative glassmorphism border-2 border-dashed transition-all duration-300 hover:glow-border cursor-pointer',
                isDragOver ? 'border-purple-400 bg-purple-500/10' : 'border-gray-600',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                if (!disabled) setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onClick={() => !disabled && document.getElementById('file-input')?.click()}
            >
              <CardContent className="p-12 text-center">
                <motion.div
                  animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400 neon-pulse" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  Drop your PDF here
                </h3>
                <p className="text-gray-400 mb-4">
                  or click to browse files
                </p>
                <p className="text-sm text-gray-500">
                  Supports PDF files up to 10MB
                </p>
                
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  disabled={disabled}
                />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between p-4 glassmorphism glow-border rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-white font-medium">{selectedFile.name}</p>
                <p className="text-gray-400 text-sm">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            {!disabled && (
              <motion.button
                onClick={removeFile}
                className="p-2 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}