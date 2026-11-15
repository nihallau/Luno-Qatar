import React from 'react';

/**
 * Global background foundation:
 * 1. Deep burgundy canvas (#2B0A10 to #4A121C)
 * 2. Subtle Asanoha (hemp leaf) pattern at very low opacity for lower sections
 * 3. Washi paper grain texture overlay
 */
export function GlobalCanvas() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Base Burgundy Depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 30%, #4A121C 0%, #370D14 48%, #2B0A10 100%)',
        }}
      />

      {/* Subtle Asanoha (Hemp Leaf) Pattern for architectural continuity */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] text-[#C9A15A]"
        style={{
          maskImage:
            'radial-gradient(circle at 20% 80%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.25) 55%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(circle at 20% 80%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.25) 55%, transparent 90%)',
        }}
      >
        <defs>
          <pattern
            id="luno-asanoha"
            width="60"
            height="52"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="currentColor" strokeWidth="0.65">
              <path d="M30 0 L60 17.32 L60 51.96 L30 34.64 Z" />
              <path d="M30 0 L0 17.32 L0 51.96 L30 34.64 Z" />
              <path d="M30 0 L30 34.64 M0 17.32 L60 17.32 M0 51.96 L30 17.32 L60 51.96" />
              <path d="M0 17.32 L30 34.64 L60 17.32" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#luno-asanoha)" />
      </svg>

      {/* Washi Paper Grain Texture Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay">
        <filter id="luno-washi-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#luno-washi-grain)" />
      </svg>
    </div>
  );
}
