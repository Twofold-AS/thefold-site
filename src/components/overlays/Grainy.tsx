"use client";

import React from "react";

type GrainProps = {
  /** Show animation or keep it static */
  animate?: boolean;
  /** Canvas pattern size (px) */
  patternWidth?: number;
  patternHeight?: number;
  /** Grain appearance */
  grainOpacity?: number;  // 0..1
  grainDensity?: number;  // step between dots
  grainWidth?: number;    // dot width
  grainHeight?: number;   // dot height
  /** Animation behavior */
  grainChaos?: number;    // seconds per cycle
  grainSpeed?: number;    // steps() count
  /** Extra classes on the outer wrapper (which is absolute inset-0) */
  className?: string;
};

/**
 * Absolutely positioned grain overlay.
 * Place inside a `relative` container. It won't block pointer events.
 */
export function GrainOverlay({
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
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);

  // Generate the grain data URL client-side
  React.useEffect(() => {
    try {
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
    } catch {
      // no-op; keep overlay hidden if something goes wrong
    }
  }, [patternWidth, patternHeight, grainOpacity, grainDensity, grainWidth, grainHeight]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* The moving oversized layer (same trick as Grained.js) */}
      {dataUrl && (
        <div
          style={{
            position: "absolute",
            left: "-100%",
            top: "-100%",
            width: "300%",
            height: "300%",
            backgroundImage: `url(${dataUrl})`,
            animationName: animate ? "grainMove" : "none",
            animationIterationCount: "infinite",
            animationDuration: `${grainChaos}s`,
            animationTimingFunction: `steps(${grainSpeed}, end)`,
          }}
        />
      )}

      {/* Keyframes local to this component */}
      <style jsx>{`
        @keyframes grainMove {
          0% { transform: translate(-10%, 10%); }
          10% { transform: translate(-25%, 0%); }
          20% { transform: translate(-30%, 10%); }
          30% { transform: translate(-30%, 30%); }
          40% { transform: translate(-20%, 20%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(-20%, 20%); }
          70% { transform: translate(-5%, 20%); }
          80% { transform: translate(-25%, 5%); }
          90% { transform: translate(-30%, 25%); }
          100% { transform: translate(-10%, 10%); }
        }
      `}</style>
    </div>
  );
}
