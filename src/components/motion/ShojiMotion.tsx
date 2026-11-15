import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

export const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;

export type ShojiDirection = 'left' | 'right' | 'center' | 'up' | 'down';

interface ShojiMaskWipeProps {
  children: React.ReactNode;
  direction?: ShojiDirection;
  delay?: number;
  duration?: number;
  trigger?: 'inView' | 'controlled' | 'mount';
  isRevealed?: boolean;
  viewportAmount?: number | 'some' | 'all';
  withEdgeLine?: boolean;
  className?: string;
}

function getMaskGeometry(direction: ShojiDirection) {
  switch (direction) {
    case 'right':
      return {
        hiddenClip: 'inset(0% 0% 0% 100%)',
        visibleClip: 'inset(0% 0% 0% 0%)',
        hiddenOffset: { x: 18, y: 0 },
      };
    case 'center':
      return {
        hiddenClip: 'inset(0% 50% 0% 50%)',
        visibleClip: 'inset(0% 0% 0% 0%)',
        hiddenOffset: { x: 0, y: 10 },
      };
    case 'up':
      return {
        hiddenClip: 'inset(100% 0% 0% 0%)',
        visibleClip: 'inset(0% 0% 0% 0%)',
        hiddenOffset: { x: 0, y: 18 },
      };
    case 'down':
      return {
        hiddenClip: 'inset(0% 0% 100% 0%)',
        visibleClip: 'inset(0% 0% 0% 0%)',
        hiddenOffset: { x: 0, y: -16 },
      };
    case 'left':
    default:
      return {
        hiddenClip: 'inset(0% 100% 0% 0%)',
        visibleClip: 'inset(0% 0% 0% 0%)',
        hiddenOffset: { x: -18, y: 0 },
      };
  }
}

/**
 * Unfolds content with a traditional Japanese shoji / byobu screen mask-wipe
 * paired with a subtle directional glide and optional gold kumiko edge sweep.
 */
export function ShojiMaskWipe({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.88,
  trigger = 'inView',
  isRevealed = true,
  viewportAmount = 0.1,
  withEdgeLine = false,
  className = '',
}: ShojiMaskWipeProps) {
  const prefersReducedMotion = useReducedMotion();
  const geometry = getMaskGeometry(direction);

  const variants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2, delay: Math.min(delay, 0.1) },
        },
      }
    : {
        hidden: {
          opacity: 0.08,
          clipPath: geometry.hiddenClip,
          x: geometry.hiddenOffset.x,
          y: geometry.hiddenOffset.y,
        },
        visible: {
          opacity: 1,
          clipPath: geometry.visibleClip,
          x: 0,
          y: 0,
          transition: {
            duration,
            delay,
            ease: SHOJI_EASE,
          },
        },
      };

  const motionProps =
    trigger === 'inView'
      ? {
          initial: 'hidden' as const,
          whileInView: 'visible' as const,
          viewport: { once: true, amount: viewportAmount },
        }
      : trigger === 'mount'
        ? {
            initial: 'hidden' as const,
            animate: 'visible' as const,
          }
        : {
            initial: 'hidden' as const,
            animate: isRevealed ? ('visible' as const) : ('hidden' as const),
          };

  const shouldShowEdge = withEdgeLine && !prefersReducedMotion;

  return (
    <motion.div
      variants={variants}
      {...motionProps}
      className={`relative ${className}`}
    >
      {children}

      {/* Moving Shoji Cedar/Gold Leading Edge Highlight */}
      {shouldShowEdge && direction !== 'center' && (
        <motion.div
          aria-hidden="true"
          variants={{
            hidden: {
              opacity: 0,
              x: '0%',
              y: '0%',
            },
            visible: {
              opacity: [0, 0.9, 0.75, 0],
              x:
                direction === 'left'
                  ? ['0%', '100%']
                  : direction === 'right'
                    ? ['0%', '-100%']
                    : '0%',
              y:
                direction === 'down'
                  ? ['0%', '100%']
                  : direction === 'up'
                    ? ['0%', '-100%']
                    : '0%',
              transition: {
                duration: duration * 0.95,
                delay,
                ease: SHOJI_EASE,
                times: [0, 0.18, 0.8, 1],
              },
            },
          }}
          className="pointer-events-none absolute inset-0 overflow-hidden z-20"
        >
          {direction === 'left' && (
            <span className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#C9A15A]/80 to-transparent" />
          )}
          {direction === 'right' && (
            <span className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#C9A15A]/80 to-transparent" />
          )}
          {direction === 'down' && (
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A15A]/80 to-transparent" />
          )}
          {direction === 'up' && (
            <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A15A]/80 to-transparent" />
          )}
        </motion.div>
      )}

      {shouldShowEdge && direction === 'center' && (
        <>
          <motion.div
            aria-hidden="true"
            variants={{
              hidden: { opacity: 0, x: '0%' },
              visible: {
                opacity: [0, 0.9, 0.75, 0],
                x: ['0%', '-50%'],
                transition: {
                  duration: duration * 0.95,
                  delay,
                  ease: SHOJI_EASE,
                  times: [0, 0.18, 0.8, 1],
                },
              },
            }}
            className="pointer-events-none absolute inset-0 overflow-hidden z-20"
          >
            <span className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#C9A15A]/80 to-transparent" />
          </motion.div>
          <motion.div
            aria-hidden="true"
            variants={{
              hidden: { opacity: 0, x: '0%' },
              visible: {
                opacity: [0, 0.9, 0.75, 0],
                x: ['0%', '50%'],
                transition: {
                  duration: duration * 0.95,
                  delay,
                  ease: SHOJI_EASE,
                  times: [0, 0.18, 0.8, 1],
                },
              },
            }}
            className="pointer-events-none absolute inset-0 overflow-hidden z-20"
          >
            <span className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#C9A15A]/80 to-transparent" />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

interface ShojiTrackDividerProps {
  origin?: 'left' | 'center' | 'right';
  delay?: number;
  className?: string;
}

/**
 * Gold shoji track hairline that draws open along section boundaries.
 */
export function ShojiTrackDivider({
  origin = 'center',
  delay = 0.05,
  className = '',
}: ShojiTrackDividerProps) {
  const prefersReducedMotion = useReducedMotion();
  const originClass =
    origin === 'left'
      ? 'origin-left'
      : origin === 'right'
        ? 'origin-right'
        : 'origin-center';

  return (
    <motion.div
      aria-hidden="true"
      initial={prefersReducedMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.3 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 1.0, delay, ease: SHOJI_EASE }
      }
      className={`h-px w-full bg-gradient-to-r from-transparent via-[#C9A15A]/45 to-transparent ${originClass} ${className}`}
    />
  );
}
