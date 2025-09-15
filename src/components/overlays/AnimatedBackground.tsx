"use client";

interface AnimatedBackgroundProps {
  variant: 'dots' | 'grid' | 'waves' | 'none';
  className?: string;
}

export default function AnimatedBackground({ variant, className = '' }: AnimatedBackgroundProps) {
  if (variant === 'none') return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {variant === 'dots' && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
            animation: 'float 20s ease-in-out infinite'
          }} />
        </div>
      )}
      
      {variant === 'grid' && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'drift 30s linear infinite'
          }} />
        </div>
      )}
      
      {variant === 'waves' && (
        <div className="absolute inset-0 opacity-5">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>
            </defs>
            <path
              d="M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z"
              fill="url(#waveGradient)"
              style={{ animation: 'wave 15s ease-in-out infinite' }}
            />
          </svg>
        </div>
      )}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes drift {
          0% { transform: translateX(0px) translateY(0px); }
          100% { transform: translateX(-50px) translateY(-50px); }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateX(0px) scaleY(1); }
          50% { transform: translateX(-50px) scaleY(1.1); }
        }
      `}</style>
    </div>
  );
}

