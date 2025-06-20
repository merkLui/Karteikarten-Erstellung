'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Brain, Download, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import GlowButton from '@/components/GlowButton';

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/generate');
    } else {
      router.push('/login');
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI extracts key concepts and generates intelligent questions from your PDFs.',
      color: 'text-purple-400',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process documents in seconds with real-time streaming progress updates.',
      color: 'text-blue-400',
    },
    {
      icon: Download,
      title: 'Export Ready',
      description: 'Download your flashcards as CSV files for use in any study platform.',
      color: 'text-green-400',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your documents are processed securely and never stored on our servers.',
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6"
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold glow-text"
            whileHover={{ scale: 1.05 }}
          >
            CyberCards
          </motion.div>
          <motion.div
            className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            About
          </motion.div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex items-center justify-center min-h-[80vh] px-6"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="glow-text">Transform</span>
              <br />
              <span className="text-white">PDFs into</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Flashcards
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Harness the power of AI to convert your study materials into 
              interactive flashcards in seconds. Study smarter, not harder.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <GlowButton
              onClick={handleGetStarted}
              className="group"
            >
              <span className="flex items-center">
                {isAuthenticated === null ? 'Loading...' : isAuthenticated ? 'Go to Generator' : 'Login to Start'}
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </GlowButton>
            
            <GlowButton variant="secondary">
              Watch Demo
            </GlowButton>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="glow-text">CyberCards</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of studying with our cutting-edge features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 glassmorphism glow-border rounded-2xl text-center group cursor-pointer"
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 ${feature.color}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <feature.icon className="w-full h-full" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:glow-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-12 glassmorphism glow-border rounded-3xl"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to <span className="glow-text">Revolutionize</span> Your Study Routine?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already transformed their learning experience
            </p>
            <GlowButton
              onClick={handleGetStarted}
              className="text-xl px-12 py-6"
            >
              {isAuthenticated === null ? 'Loading...' : isAuthenticated ? 'Go to Generator' : 'Login to Get Started'}
            </GlowButton>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}