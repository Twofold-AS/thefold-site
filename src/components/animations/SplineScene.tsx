"use client";

import { Suspense, lazy, useState, useEffect, useRef } from 'react';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: (spline: Application) => void;
  onMouseDown?: (e: any) => void;
  onMouseUp?: (e: any) => void;
  onMouseHover?: (e: any) => void;
  onScroll?: (e: any) => void;
  showLoader?: boolean;
}

function SplineLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/20 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" />
        </div>
        <p className="text-white/40 text-sm font-light tracking-widest uppercase">Loading Scene</p>
      </div>
    </div>
  );
}

export default function SplineScene({
  scene,
  className = '',
  onLoad,
  onMouseDown,
  onMouseUp,
  onMouseHover,
  onScroll,
  showLoader = true,
}: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoad = (splineApp: Application) => {
    console.log('Spline scene loaded');
    
    // Ensure canvas is visible and properly sized
    setTimeout(() => {
      const canvas = containerRef.current?.querySelector('canvas');
      if (canvas) {
        canvas.style.cssText = `
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          z-index: 1 !important;
        `;
      }
      setIsLoading(false);
    }, 100);
    
    onLoad?.(splineApp);
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
      }}
    >
      {/* Only show loader initially, remove it completely once loaded */}
      {isLoading && showLoader && <SplineLoader />}
      
      <Suspense fallback={showLoader ? <SplineLoader /> : null}>
        <Spline
          scene={scene}
          onLoad={handleLoad}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onScroll={onScroll}
        />
      </Suspense>
    </div>
  );
}

export function SplineSceneNoSSR(props: SplineSceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return props.showLoader ? <SplineLoader /> : null;
  }

  return <SplineScene {...props} />;
}