import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;

type WipeDirection = 'left' | 'right' | 'center' | 'up';

function getInitialClipPath(direction: WipeDirection): string {
  switch (direction) {
    case 'right':
      return 'inset(0 0 0 100%)';
    case 'center':
      return 'inset(0 50% 0 50%)';
    case 'up':
      return 'inset(100% 0 0 0)';
    case 'left':
    default:
      return 'inset(0 100% 0 0)';
  }
}

function getInitialOffset(direction: WipeDirection): { x?: number; y?: number } {
  switch (direction) {
    case 'right':
      return { x: 18 };
    case 'center':
      return { y: 12 };
    case 'up':
      return { y: 20 };
    case 'left':
    default:
      return { x: -18 };
  }
}

interface ShojiRevealProps {
  children: React.ReactNode;
  direction?: WipeDirection;
  delay?: number;
  duration?: number;
  trigger?: 'inView' | 'mount';
  showKumikoLine?: boolean;
  className?: string;
}

/**
 * Mimics the unfolding of a traditional Japanese shoji paper screen
 * using a compositor-only clip-path wipe, subtle opacity/transform settle,
 * and an optional sweeping gold kumiko lattice edge line.
 */
export function ShojiReveal({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.9,
  trigger = 'inView',
  showKumikoLine = true,
  className = '',
}: ShojiRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const initialClip = getInitialClipPath(direction);
  const offset = getInitialOffset(direction);

  const initialState = prefersReducedMotion
    ? { opacity: 0 }
    : {
        opacity: 0.12,
        clipPath: initialClip,
        ...offset,
      };

  const targetState = prefersReducedMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
        x: 0,
        y: 0,
      };

  const transition = prefersReducedMotion
    ? { duration: 0.2, delay: Math.min(delay, 0.1) }
    : { duration, delay, ease: SHOJI_EASE };

  const sweepStart =
    direction === 'right'
      ? { left: '100%', opacity: 0.85 }
      : direction === 'center'
        ? { left: '50%', opacity: 0.85 }
        : { left: '0%', opacity: 0.85 };

  const sweepEnd =
    direction === 'right'
      ? { left: '0%', opacity: 0 }
      : { left: '100%', opacity: 0 };

  return (
    <motion.div
      initial={initialState}
      animate={trigger === 'mount' ? targetState : undefined}
      whileInView={trigger === 'inView' ? targetState : undefined}
      viewport={trigger === 'inView' ? { once: true, amount: 0.08 } : undefined}
      transition={transition}
      className={`relative ${className}`}
    >
      {children}

      {showKumikoLine && !prefersReducedMotion && direction !== 'up' && (
        <motion.span
          aria-hidden="true"
          initial={sweepStart}
          animate={trigger === 'mount' ? sweepEnd : undefined}
          whileInView={trigger === 'inView' ? sweepEnd : undefined}
          viewport={
            trigger === 'inView' ? { once: true, amount: 0.08 } : undefined
          }
          transition={{
            duration: duration * 0.95,
            delay,
            ease: SHOJI_EASE,
          }}
          className="pointer-events-none absolute inset-y-0 z-20 w-px bg-gradient-to-b from-transparent via-[#C9A15A]/80 to-transparent"
        />
      )}
    </motion.div>
  );
}

interface ShojiStaggerItemProps {
  children: React.ReactNode;
  index?: number;
  staggerStep?: number;
  baseDelay?: number;
  direction?: WipeDirection;
  trigger?: 'inView' | 'mount';
  className?: string;
}

/**
 * Staggered Shoji sub-panel that unfolds sequentially inside a section.
 */
export function ShojiStaggerItem({
  children,
  index = 0,
  staggerStep = 0.1,
  baseDelay = 0.08,
  direction = 'up',
  trigger = 'inView',
  className = '',
}: ShojiStaggerItemProps) {
  const computedDelay = baseDelay + Math.min(index * staggerStep, 0.45);
  return (
    <ShojiReveal
      direction={direction}
      delay={computedDelay}
      duration={0.8}
      trigger={trigger}
      showKumikoLine={direction !== 'up'}
      className={className}
    >
      {children}
    </ShojiReveal>
  );
}
