'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export default function GlowButton({
  children,
  onClick,
  className,
  variant = 'primary',
  disabled = false,
  type = 'button',
}: GlowButtonProps) {
  const baseClasses = 'relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 border-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 text-white hover:from-purple-500 hover:to-blue-500 glow-border shadow-lg shadow-purple-500/25',
    secondary: 'bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses[variant], className)}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl"
        animate={!disabled ? {
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.1, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}