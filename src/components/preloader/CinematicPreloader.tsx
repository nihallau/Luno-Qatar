import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LUNO_BRAND } from '../../constants/brand';

interface CinematicPreloaderProps {
  onRevealStart: () => void;
  onComplete: () => void;
}

const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;
const LETTERS = ['L', 'U', 'N', 'O'] as const;
const LETTER_SPREAD_OFFSETS = [-24, -8, 8, 24] as const;

const SAKURA_PETALS = [
  { id: 1, left: '18%', delay: 0.1, duration: 2.8, drift: 26, size: 10 },
  { id: 2, left: '34%', delay: 0.35, duration: 2.6, drift: -22, size: 8 },
  { id: 3, left: '66%', delay: 0.2, duration: 2.9, drift: 20, size: 9 },
  { id: 4, left: '82%', delay: 0.45, duration: 2.5, drift: -28, size: 11 },
] as const;

type PreloaderPhase = 'playing' | 'splitting' | 'done';

/**
 * 3-Second Japanese Motion Graphics Intro:
 * 1. Expanding Seigaiha wave ripples, gold Enso brush stroke & floating sakura-gold petals
 * 2. Vermilion hanko seal impact + Japanese kanji calligraphy ("月乃") + gold diamond
 * 3. LUNO letter-by-letter blur-to-sharp reveal + tagline
 * 4. Noren / Shoji sliding curtains split open at ~2.35s (3.05s total)
 */
export function CinematicPreloader({
  onRevealStart,
  onComplete,
}: CinematicPreloaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<PreloaderPhase>('playing');
  const hasTriggeredSplitRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const splitFinishTimerRef = useRef<number | null>(null);

  const finishSequence = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setPhase('done');
    onComplete();
  }, [onComplete]);

  const triggerSplit = useCallback(
    (fast = false) => {
      if (hasTriggeredSplitRef.current) {
        if (fast) {
          if (splitFinishTimerRef.current !== null) {
            window.clearTimeout(splitFinishTimerRef.current);
          }
          finishSequence();
        }
        return;
      }
      hasTriggeredSplitRef.current = true;
      setPhase('splitting');
      onRevealStart();

      const splitDurationMs = prefersReducedMotion ? 240 : fast ? 480 : 720;
      splitFinishTimerRef.current = window.setTimeout(() => {
        finishSequence();
      }, splitDurationMs);
    },
    [finishSequence, onRevealStart, prefersReducedMotion]
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      const reducedTimer = window.setTimeout(() => {
        triggerSplit(true);
      }, 600);
      return () => window.clearTimeout(reducedTimer);
    }

    // 2.35s motion sequence + 0.72s shoji curtain split (~3.07s total)
    const splitTimer = window.setTimeout(() => {
      triggerSplit(false);
    }, 2350);

    return () => window.clearTimeout(splitTimer);
  }, [prefersReducedMotion, triggerSplit]);

  useEffect(() => {
    return () => {
      if (splitFinishTimerRef.current !== null) {
        window.clearTimeout(splitFinishTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' ||
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault();
        triggerSplit(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerSplit]);

  if (phase === 'done') {
    return null;
  }

  const isSplitting = phase === 'splitting';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="LUNO Qatar Japanese opening animation"
      onClick={() => triggerSplit(true)}
      className="fixed inset-0 z-50 cursor-pointer select-none overflow-hidden"
    >
      {/* Left Shoji / Noren Curtain */}
      <motion.div
        aria-hidden="true"
        initial={{ x: '0%' }}
        animate={
          isSplitting
            ? prefersReducedMotion
              ? { opacity: 0 }
              : { x: '-100%' }
            : { x: '0%', opacity: 1 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.24 }
            : { duration: 0.72, ease: SHOJI_EASE }
        }
        className="absolute inset-y-0 left-0 w-1/2 bg-[#2B0A10] border-r border-[#C9A15A]/40"
      >
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(201,161,90,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,161,90,0.45) 1px, transparent 1px)',
            backgroundSize: '128px 128px',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 100% 50%, rgba(74, 18, 28, 0.65) 0%, transparent 72%)',
          }}
        />
      </motion.div>

      {/* Right Shoji / Noren Curtain */}
      <motion.div
        aria-hidden="true"
        initial={{ x: '0%' }}
        animate={
          isSplitting
            ? prefersReducedMotion
              ? { opacity: 0 }
              : { x: '100%' }
            : { x: '0%', opacity: 1 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.24 }
            : { duration: 0.72, ease: SHOJI_EASE }
        }
        className="absolute inset-y-0 right-0 w-1/2 bg-[#2B0A10] border-l border-[#C9A15A]/40"
      >
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to left, rgba(201,161,90,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,161,90,0.45) 1px, transparent 1px)',
            backgroundSize: '128px 128px',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 0% 50%, rgba(74, 18, 28, 0.65) 0%, transparent 72%)',
          }}
        />
      </motion.div>

      {/* Center Japanese Motion Graphics Ceremony */}
      <motion.div
        animate={isSplitting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6"
      >
        {/* Expanding Japanese Wave / Lunar Ripples Behind Crest */}
        {!prefersReducedMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <motion.span
              initial={{ scale: 0.35, opacity: 0.5 }}
              animate={{ scale: 1.85, opacity: 0 }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
              className="absolute w-56 h-56 rounded-full border border-[#C9A15A]/30"
            />
            <motion.span
              initial={{ scale: 0.35, opacity: 0.4 }}
              animate={{ scale: 2.15, opacity: 0 }}
              transition={{ duration: 2.3, delay: 0.3, ease: 'easeOut' }}
              className="absolute w-56 h-56 rounded-full border border-[#C9A15A]/20"
            />

            {/* Floating Sakura-Gold Petals */}
            {SAKURA_PETALS.map((petal) => (
              <motion.svg
                key={petal.id}
                viewBox="0 0 16 16"
                fill="none"
                style={{
                  left: petal.left,
                  width: `${petal.size}px`,
                  height: `${petal.size}px`,
                }}
                initial={{ y: '-12vh', x: 0, opacity: 0, rotate: 0 }}
                animate={{
                  y: '105vh',
                  x: petal.drift,
                  opacity: [0, 0.55, 0.45, 0],
                  rotate: 135,
                }}
                transition={{
                  duration: petal.duration,
                  delay: petal.delay,
                  ease: 'linear',
                }}
                className="absolute top-0 text-[#C9A15A]"
              >
                <path
                  d="M8 1C10.8 3.6 13 6.8 11.4 10.6C10.4 13 8.9 14.2 8 15C7.1 14.2 5.6 13 4.6 10.6C3 6.8 5.2 3.6 8 1Z"
                  fill="currentColor"
                />
              </motion.svg>
            ))}
          </div>
        )}

        {/* Vertical Japanese Calligraphy + Vermilion Hanko Seal Accent */}
        <div className="relative flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-5">
          <motion.p
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0.78, clipPath: 'inset(0 0 0% 0)' }
            }
            transition={{ duration: 0.75, delay: 0.15, ease: SHOJI_EASE }}
            aria-hidden="true"
            className="vertical-text-rl font-jp text-[11px] sm:text-xs font-light tracking-[0.35em] sm:tracking-[0.4em] text-[#F3E9DC]/75"
          >
            月乃 · おもてなし
          </motion.p>

          {/* Gold Enso Brush Circle + Inner Diamond */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
            <svg
              viewBox="0 0 160 160"
              fill="none"
              aria-hidden="true"
              className="w-full h-full text-[#C9A15A]"
            >
              <motion.path
                d="M84 15 C120 14, 146 44, 145 80 C144 118, 115 145, 79 145 C42 145, 15 117, 15 81 C16 48, 41 21, 73 16"
                pathLength={100}
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray="100"
                initial={{ strokeDashoffset: prefersReducedMotion ? 0 : 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.2 }
                    : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
                }
              />
              <motion.path
                d="M80 19 C114 19, 141 47, 141 80 C141 114, 113 141, 80 141 C49 141, 24 118, 20 88"
                pathLength={100}
                stroke="currentColor"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeDasharray="100"
                opacity={0.45}
                initial={{ strokeDashoffset: prefersReducedMotion ? 0 : 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.2 }
                    : { duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
                }
              />
            </svg>

            {/* 4-Point Gold Diamond inside Enso */}
            <motion.svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="absolute w-4 h-4 text-[#C9A15A]"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.2 }
                  : { duration: 0.45, delay: 0.68, ease: SHOJI_EASE }
              }
            >
              <path
                d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                fill="currentColor"
              />
            </motion.svg>
          </div>

          {/* Vermilion Hanko Stamp Impact */}
          <motion.div
            aria-hidden="true"
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.5 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : { duration: 0.42, delay: 0.72, ease: [0.22, 1, 0.36, 1] }
            }
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-[3px] bg-[#B3262E] shadow-[inset_0_0_0_1px_rgba(243,233,220,0.3)] -rotate-3"
          >
            <span className="font-jp text-[9px] sm:text-[10px] text-[#F3E9DC] vertical-text-rl leading-none">
              月乃
            </span>
          </motion.div>
        </div>

        {/* LUNO Wordmark — Letter-by-letter Blur-to-Sharp Reveal */}
        <div
          aria-label={LUNO_BRAND.name}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-4"
        >
          {LETTERS.map((letter, index) => {
            const isO = letter === 'O';
            return (
              <motion.span
                key={letter}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: LETTER_SPREAD_OFFSETS[index],
                        filter: 'blur(9px)',
                      }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        x: 0,
                        filter: 'blur(0px)',
                      }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0.2 }
                    : {
                        duration: 0.65,
                        delay: 0.92 + index * 0.09,
                        ease: SHOJI_EASE,
                      }
                }
                className="relative inline-flex items-center justify-center font-display text-5xl sm:text-6xl md:text-7xl font-light text-[#F3E9DC] leading-none"
              >
                {letter}
                {isO && (
                  <motion.svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="absolute w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A15A]"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.2 }
                        : { duration: 0.35, delay: 1.45, ease: SHOJI_EASE }
                    }
                  >
                    <path
                      d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                )}
              </motion.span>
            );
          })}
        </div>

        {/* Tagline Flanked by Gold Dots */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { duration: 0.55, delay: 1.62, ease: SHOJI_EASE }
          }
          className="flex items-center justify-center gap-3 sm:gap-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A15A]" aria-hidden="true" />
          <p className="font-body text-[11px] sm:text-xs font-light tracking-[0.34em] uppercase text-[#F3E9DC]/85 text-center">
            {LUNO_BRAND.tagline}
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A15A]" aria-hidden="true" />
        </motion.div>

        {/* Quiet Skip Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            triggerSplit(true);
          }}
          className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-4 sm:right-10 px-4 py-2.5 min-h-[44px] min-w-[44px] font-body text-[11px] font-light tracking-[0.28em] uppercase text-[#C9A15A]/80 hover:text-[#F3E9DC] transition-colors duration-200 whitespace-nowrap"
        >
          Skip
        </button>
      </motion.div>

      {/* Thin Gold Progress Line at Bottom */}
      <motion.div
        aria-hidden="true"
        animate={isSplitting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 inset-x-0 z-20 h-[2px] bg-[#C9A15A]/15"
      >
        <motion.div
          className="h-full w-full bg-[#C9A15A] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.6, ease: 'linear' }
              : { duration: 2.35, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </motion.div>
    </div>
  );
}
