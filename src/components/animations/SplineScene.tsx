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
  fallbackBackground?: React.ReactNode;
  enableInteraction?: boolean;
}

function SplineLoader() {
  return (
    <div className="absolute inset-0 bg-black" />
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
  fallbackBackground,
  enableInteraction = true,
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
        pointerEvents: enableInteraction ? 'auto' : 'none',
      }}
    >
      {/* Fallback background when loading or if provided */}
      {fallbackBackground && (isLoading || !enableInteraction) && fallbackBackground}
      
      {/* Only show loader initially, remove it completely once loaded */}
      {isLoading && showLoader && !fallbackBackground && <SplineLoader />}
      
      <Suspense fallback={showLoader && !fallbackBackground ? <SplineLoader /> : null}>
        <Spline
          scene={scene}
          onLoad={handleLoad}
          onMouseDown={enableInteraction ? onMouseDown : undefined}
          onMouseUp={enableInteraction ? onMouseUp : undefined}
          onScroll={enableInteraction ? onScroll : undefined}
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