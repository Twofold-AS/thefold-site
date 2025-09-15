"use client";

import { useEffect, useState } from 'react';
import DynamicText from '@/components/ui/DynamicText'

interface LoadingOverlayProps {
  onComplete?: () => void;
  duration?: number;
}

export default function LoadingOverlay({ onComplete, duration = 2000 }: LoadingOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

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

    // Hide overlay after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
          <DynamicText/>
      </div>
    </div>
  );
}

