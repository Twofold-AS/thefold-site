"use client";

import { useEffect, useState } from 'react';
import { TextRoll } from '@/components/ui/RollingText';

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`relative w-full h-screen flex items-center justify-center ${className}`}>
      {/* Ensure the text is properly positioned and has pointer events */}
      <div className="text-center z-20 relative pointer-events-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <TextRoll className="text-6xl font-bold">The next generation of booking</TextRoll>
        </div>
      </div>
    </section>
  );
}