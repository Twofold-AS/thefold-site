"use client";

import { useEffect, useState } from 'react';
import { TextRoll, Skiper58 } from '@/components/ui/RollingText'

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
      <div className="text-center z-10 relative">
        <Skiper58 />
      </div>
    </section>
  );
}
