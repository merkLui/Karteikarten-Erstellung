'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Flashcard } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Download } from 'lucide-react';
import { useState } from 'react';
import GlowButton from './GlowButton';

interface FlashcardDisplayProps {
  cards: Flashcard[];
  onExportCSV: () => void;
}

export default function FlashcardDisplay({ cards, onExportCSV }: FlashcardDisplayProps) {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const toggleCard = (cardId: string) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(cardId)) {
      newFlipped.delete(cardId);
    } else {
      newFlipped.add(cardId);
    }
    setFlippedCards(newFlipped);
  };

  if (cards.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white glow-text">
          Generated Flashcards ({cards.length})
        </h2>
        <GlowButton onClick={onExportCSV} variant="secondary">
          <Download className="w-5 h-5 mr-2" />
          Export CSV
        </GlowButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="perspective-1000"
            >
              <motion.div
                className="relative h-48 cursor-pointer preserve-3d"
                onClick={() => toggleCard(card.id)}
                animate={{
                  rotateY: flippedCards.has(card.id) ? 180 : 0,
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* Front of card (Question) */}
                <Card className="absolute inset-0 glassmorphism glow-border backface-hidden">
                  <CardContent className="p-6 h-full flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-white text-center text-lg leading-relaxed">
                        {card.question}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-purple-400 text-sm">Question</span>
                      <RotateCcw className="w-4 h-4 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>

                {/* Back of card (Answer) */}
                <Card className="absolute inset-0 glassmorphism glow-border backface-hidden rotate-y-180">
                  <CardContent className="p-6 h-full flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-white text-center text-lg leading-relaxed">
                        {card.answer}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-blue-400 text-sm">Answer</span>
                      <RotateCcw className="w-4 h-4 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}