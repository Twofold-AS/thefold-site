"use client";

import React, { useEffect, useState } from "react";

type GrainProps = {
  animate?: boolean;
  patternWidth?: number;
  patternHeight?: number;
  grainOpacity?: number;
  grainDensity?: number;
  grainWidth?: number;
  grainHeight?: number;
  grainChaos?: number;
  grainSpeed?: number;
  className?: string;
};

export default function GrainOverlay({
  animate = true,
  patternWidth = 100,
  patternHeight = 100,
  grainOpacity = 0.1,
  grainDensity = 1,
  grainWidth = 1,
  grainHeight = 1,
  grainChaos = 1.5,
  grainSpeed = 20,
  className = "",
}: GrainProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = patternWidth;
    canvas.height = patternHeight;

    for (let x = 0; x < patternWidth; x += grainDensity) {
      for (let y = 0; y < patternHeight; y += grainDensity) {
        const v = (Math.random() * 256) | 0;
        ctx.fillStyle = `rgba(${v},${v},${v},${grainOpacity})`;
        ctx.fillRect(x, y, grainWidth, grainHeight);
      }
    }
    
    setDataUrl(canvas.toDataURL("image/png"));
  }, [patternWidth, patternHeight, grainOpacity, grainDensity, grainWidth, grainHeight]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {dataUrl && (
        <div
          className="absolute -inset-full w-[300%] h-[300%]"
          style={{
            backgroundImage: `url(${dataUrl})`,
            animation: animate ? `grainMove ${grainChaos}s steps(${grainSpeed}, end) infinite` : 'none',
          }}
        />
      )}

      <style jsx>{`
        @keyframes grainMove {
          0%, 100% { transform: translate(-10%, 10%); }
          20% { transform: translate(-30%, 10%); }
          40% { transform: translate(-20%, 20%); }
          60% { transform: translate(-20%, 20%); }
          80% { transform: translate(-25%, 5%); }
        }
      `}</style>
    </div>
  );
}