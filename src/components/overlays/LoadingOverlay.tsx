"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DynamicText from '@/components/ui/DynamicText';

interface LoadingOverlayProps {
  onComplete?: () => void;
  duration?: number;
}

export default function LoadingOverlay({ onComplete, duration = 2500 }: LoadingOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Start exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      
      // Complete exit after animation
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 800); // Match the exit animation duration
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.1,
          filter: "blur(20px)",
        }}
        transition={{ 
          duration: 0.8,
          ease: [0.33, 1, 0.68, 1]
        }}
        className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: -20,
            scale: 0.9,
          }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut",
            delay: 0.1
          }}
          className="flex flex-col items-center gap-8"
        >
          <motion.div
            animate={isExiting ? { 
              scale: 0.8, 
              opacity: 0.6,
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <DynamicText />
          </motion.div>
          
          {/* Optional progress indicator */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            className="h-0.5 bg-gray-300 rounded-full overflow-hidden max-w-xs w-full"
          >
            <motion.div
              className="h-full bg-black rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}