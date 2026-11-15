import React from 'react';

interface MotifProps {
  className?: string;
}

/**
 * Gold Enso (hand-brushed circle) motif in muted gold (#C9A15A).
 * Open stroke symbolizes ma (negative space) and quiet imperfection.
 */
export function EnsoCircle({ className = '' }: MotifProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M124 22 C178 21, 218 65, 217 120 C216 176, 173 218, 118 218 C64 218, 22 175, 23 121 C24 72, 60 32, 107 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="1 0"
        opacity="0.7"
      />
      <path
        d="M119 26 C172 26, 213 68, 213 120 C213 172, 171 213, 119 213 C72 213, 33 177, 28 131"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

/**
 * Crescent moon & four-point star emblem echoing the name "LUNO"
 * and the gold star centered inside the O of the LUNO logotype.
 */
export function CrescentMoon({ className = '' }: MotifProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M27.5 8.5C19.5 10.1 13.5 17.1 13.5 25.5C13.5 34.9 21.1 42.5 30.5 42.5C33.4 42.5 36.1 41.8 38.5 40.5C32.5 40.1 27.6 35.1 27.6 29C27.6 22.8 32.6 17.8 38.8 17.5C36.4 12.1 32.3 9.2 27.5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <path
        d="M34 11L35.1 13.9L38 15L35.1 16.1L34 19L32.9 16.1L30 15L32.9 13.9L34 11Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Small vermilion (#B3262E) hanko-style seal stamp.
 * The sole intentional touch of vermilion in the palette.
 */
export function HankoSeal({ className = '' }: MotifProps) {
  return (
    <div
      className={`inline-flex items-center justify-center w-9 h-9 border border-[#B3262E]/90 bg-[#B3262E] text-[#F3E9DC] select-none shadow-[inset_0_0_0_1px_rgba(243,233,220,0.22)] ${className}`}
      aria-label="LUNO seal"
      role="img"
    >
      <span className="font-jp text-[11px] font-normal leading-none tracking-[0.12em] vertical-text-rl">
        月乃
      </span>
    </div>
  );
}
