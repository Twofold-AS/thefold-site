"use client";

import AnimatedBackground from './AnimatedBackground';

interface SectionBackgroundProps {
  variant: 'gradient-purple' | 'gradient-blue' | 'gradient-pink' | 'dark' | 'black';
  pattern?: 'dots' | 'grid' | 'waves' | 'none';
  className?: string;
  children: React.ReactNode;
}

export default function SectionBackground({ 
  variant, 
  pattern = 'none',
  className = '', 
  children 
}: SectionBackgroundProps) {
  const getBackgroundClasses = () => {
    switch (variant) {
      case 'gradient-purple':
        return 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900';
      case 'gradient-blue':
        return 'bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900';
      case 'gradient-pink':
        return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900';
      case 'dark':
        return 'bg-slate-900';
      case 'black':
        return 'bg-black';
      default:
        return 'bg-black';
    }
  };

  return (
    <div className={`relative ${getBackgroundClasses()} ${className}`}>
      {/* Animated background pattern */}
      <AnimatedBackground variant={pattern} />
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
