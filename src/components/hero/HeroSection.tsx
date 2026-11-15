import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { menuData } from '../../../data/menu.js';
import { siteData } from '../../../data/site.js';
import { LUNO_BRAND } from '../../constants/brand';
import hamachiCrudoImg from '../../assets/images/dish_hamachi_crudo_1794762184629.jpg';
import wagyuTatakiImg from '../../assets/images/dish_wagyu_tataki_1794762184776.jpg';
import blackCodImg from '../../assets/images/dish_black_cod_1794762186365.jpg';
import matchaMilleImg from '../../assets/images/dish_matcha_mille_1794762188248.jpg';

interface HeroSectionProps {
  isRevealed: boolean;
  onScrollCueClick: () => void;
}

interface SpotlightDish {
  id: string;
  name: string;
  course: string;
  priceLabel: string;
  kanji: string;
  image: string;
}

const SPOTLIGHT_DISHES: readonly SpotlightDish[] = [
  {
    id: 'spot-1',
    name: menuData.featuredDishes[0]?.name ?? 'Crescent Hamachi Crudo',
    course: menuData.featuredDishes[0]?.course ?? 'Starter · Signature',
    priceLabel: menuData.featuredDishes[0]?.tag ?? 'QAR 115',
    kanji: '旬',
    image: hamachiCrudoImg,
  },
  {
    id: 'spot-2',
    name: menuData.featuredDishes[1]?.name ?? 'Miyazaki A5 Wagyu Tataki',
    course: menuData.featuredDishes[1]?.course ?? 'Chef Selection',
    priceLabel: menuData.featuredDishes[1]?.tag ?? 'QAR 265',
    kanji: '匠',
    image: wagyuTatakiImg,
  },
  {
    id: 'spot-3',
    name: menuData.featuredDishes[2]?.name ?? 'Saikyo Miso Black Cod',
    course: menuData.featuredDishes[2]?.course ?? 'Main Course',
    priceLabel: menuData.featuredDishes[2]?.tag ?? 'QAR 195',
    kanji: '火',
    image: blackCodImg,
  },
  {
    id: 'spot-4',
    name: 'Uji Matcha & Black Sesame Mille-Feuille',
    course: 'Patisserie · Signature',
    priceLabel: 'QAR 78',
    kanji: '甘',
    image: matchaMilleImg,
  },
];

const HERO_PARTICLES = [
  { id: 1, left: '12%', size: 3, blur: 0, opacity: 0.42, duration: '20s', delay: '-3s', sway: '22px', rotMid: '25deg', rotEnd: '65deg' },
  { id: 2, left: '28%', size: 9, blur: 0.6, opacity: 0.25, duration: '24s', delay: '-9s', sway: '-26px', rotMid: '55deg', rotEnd: '130deg', desktopOnly: true },
  { id: 3, left: '48%', size: 2.5, blur: 0, opacity: 0.36, duration: '22s', delay: '-14s', sway: '16px', rotMid: '15deg', rotEnd: '45deg' },
  { id: 4, left: '69%', size: 10, blur: 1.2, opacity: 0.24, duration: '27s', delay: '-6s', sway: '30px', rotMid: '-40deg', rotEnd: '-110deg', desktopOnly: true },
  { id: 5, left: '86%', size: 3, blur: 0, opacity: 0.4, duration: '23s', delay: '-11s', sway: '-18px', rotMid: '20deg', rotEnd: '50deg', desktopOnly: true },
] as const;

const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;
const WORDMARK_LETTERS = ['L', 'U', 'N', 'O'] as const;

export function HeroSection({
  isRevealed,
  onScrollCueClick,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(min-width: 768px) and (hover: hover) and (pointer: fine)'
    );
    const updateMatch = () => setIsDesktopPointer(mediaQuery.matches);
    updateMatch();
    mediaQuery.addEventListener('change', updateMatch);
    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, []);

  // Gentle auto-rotation of hero dish spotlight (pauses under reduced motion)
  useEffect(() => {
    if (prefersReducedMotion || !isRevealed) return;
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SPOTLIGHT_DISHES.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [isRevealed, prefersReducedMotion]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 45, damping: 20, mass: 0.8 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 45, damping: 20, mass: 0.8 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const patternMouseX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const patternScrollY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  const moonMouseX = useTransform(smoothMouseX, [-1, 1], [16, -16]);
  const moonMouseY = useTransform(smoothMouseY, [-1, 1], [12, -12]);
  const moonScrollY = useTransform(scrollYProgress, [0, 1], [0, 88]);

  const plateMouseX = useTransform(smoothMouseX, [-1, 1], [-14, 14]);
  const plateMouseY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !isDesktopPointer || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const revealAnim = (stepIndex: number) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: isRevealed
      ? { opacity: 1, y: 0 }
      : prefersReducedMotion
        ? { opacity: 0 }
        : { opacity: 0, y: 18 },
    transition: prefersReducedMotion
      ? { duration: 0.25 }
      : {
          duration: 0.85,
          delay: 0.08 + stepIndex * 0.09,
          ease: SHOJI_EASE,
        },
  });

  const activeDish = SPOTLIGHT_DISHES[activeIndex];
  const secondaryLeft =
    SPOTLIGHT_DISHES[(activeIndex + 1) % SPOTLIGHT_DISHES.length];
  const secondaryRight =
    SPOTLIGHT_DISHES[(activeIndex + 2) % SPOTLIGHT_DISHES.length];

  const activeParticles = isDesktopPointer
    ? HERO_PARTICLES
    : HERO_PARTICLES.filter((p) => !('desktopOnly' in p && p.desktopOnly));

  return (
    <section
      ref={heroRef}
      id="sanctuary"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-labelledby="luno-hero-heading"
      className="relative min-h-dvh w-full overflow-hidden flex flex-col justify-between pt-[calc(4.5rem+env(safe-area-inset-top))] sm:pt-24 pb-16 md:pb-6"
      style={{
        background:
          'linear-gradient(148deg, #2B0A10 0%, #3A0E17 50%, #4A121C 100%)',
      }}
    >
      {/* Drifting 6% Seigaiha Pattern */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={
          prefersReducedMotion
            ? undefined
            : {
                x: isDesktopPointer ? patternMouseX : 0,
                y: patternScrollY,
              }
        }
      >
        <div className="w-[calc(100%+240px)] h-[calc(100%+120px)] -top-[60px] -left-[120px] relative animate-seigaiha-drift opacity-[0.06] text-[#C9A15A]">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="hero-seigaiha"
                width="120"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <g fill="none" stroke="currentColor" strokeWidth="0.9">
                  <circle cx="60" cy="60" r="54" />
                  <circle cx="60" cy="60" r="42" />
                  <circle cx="60" cy="60" r="30" />
                  <circle cx="60" cy="60" r="18" />
                  <circle cx="0" cy="30" r="54" />
                  <circle cx="0" cy="30" r="42" />
                  <circle cx="0" cy="30" r="30" />
                  <circle cx="0" cy="30" r="18" />
                  <circle cx="120" cy="30" r="54" />
                  <circle cx="120" cy="30" r="42" />
                  <circle cx="120" cy="30" r="30" />
                  <circle cx="120" cy="30" r="18" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-seigaiha)" />
          </svg>
        </div>
      </motion.div>

      {/* Breathing Pale Gold Crescent Moon in Upper Right */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] right-[4%] lg:right-[8%]"
        style={
          prefersReducedMotion
            ? undefined
            : {
                x: isDesktopPointer ? moonMouseX : 0,
                y: moonScrollY,
              }
        }
      >
        <motion.div
          style={
            prefersReducedMotion || !isDesktopPointer
              ? undefined
              : { y: moonMouseY }
          }
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? { opacity: 0.65 }
                : { scale: [1, 1.045, 1], opacity: [0.55, 0.85, 0.55] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
            }
            className="w-32 h-32 sm:w-56 sm:h-56 lg:w-72 lg:h-72 opacity-60 sm:opacity-80"
          >
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full text-[#E2C68A]">
              <path
                d="M71 18C47.5 22.8 30 43.4 30 68C30 96.2 52.8 119 81 119C89.8 119 98.1 116.8 105.4 112.9C87.2 111.7 72.5 96.6 72.5 78.2C72.5 59.5 87.6 44.3 106.3 43.4C99 28.1 86 20.1 71 18Z"
                fill="currentColor"
                fillOpacity="0.09"
                stroke="currentColor"
                strokeOpacity="0.38"
                strokeWidth="0.85"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Gold Dust & Blossom Petals */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {activeParticles.map((p) => (
          <span
            key={p.id}
            className="animate-particle-fall absolute top-0 block"
            style={
              {
                left: p.left,
                filter: p.blur ? `blur(${p.blur}px)` : undefined,
                '--particle-opacity': String(p.opacity),
                '--particle-duration': p.duration,
                '--particle-delay': p.delay,
                '--particle-sway': p.sway,
                '--particle-rot-mid': p.rotMid,
                '--particle-rot-end': p.rotEnd,
              } as React.CSSProperties
            }
          >
            {p.size > 5 ? (
              <svg
                viewBox="0 0 16 16"
                fill="none"
                style={{ width: `${p.size}px`, height: `${p.size}px` }}
                className="text-[#F3E9DC]/70"
              >
                <path
                  d="M8 1C10.8 3.6 13 6.8 11.4 10.6C10.4 13 8.9 14.2 8 15C7.1 14.2 5.6 13 4.6 10.6C3 6.8 5.2 3.6 8 1Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <span
                className="block rounded-full bg-[#E2C68A]"
                style={{ width: `${p.size}px`, height: `${p.size}px` }}
              />
            )}
          </span>
        ))}
      </div>

      {/* Main Split-Stage Japanese Editorial Composition (Sushila / Sushi Samurai Reference Rhythm) */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-14 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* Left Stage: Editorial Typography, Tagline, CTAs & Interactive Plate Selector */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-7 text-left">
              {/* Eyebrow with extending gold line */}
              <motion.div
                {...revealAnim(0)}
                className="flex flex-wrap items-center gap-x-3 gap-y-1.5"
              >
                <span className="font-body text-[10px] sm:text-[11px] font-light tracking-[0.28em] sm:tracking-[0.34em] uppercase text-[#C9A15A]">
                  {LUNO_BRAND.shortLocation}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-8 sm:w-12 bg-[#C9A15A]/55"
                />
                <span className="font-body text-[10px] sm:text-[11px] font-light tracking-[0.24em] sm:tracking-[0.28em] uppercase text-[#F3E9DC]/70">
                  {LUNO_BRAND.status}
                </span>
              </motion.div>

              {/* LUNO Wordmark Lockup */}
              <motion.div {...revealAnim(1)}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-display font-light text-2xl sm:text-3xl tracking-[0.28em] text-[#F3E9DC]/90 inline-flex items-center">
                    {WORDMARK_LETTERS.map((letter) => (
                      <span
                        key={letter}
                        className="relative inline-flex items-center justify-center"
                      >
                        <span>{letter}</span>
                        {letter === 'O' && (
                          <motion.svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            animate={
                              prefersReducedMotion
                                ? { opacity: 0.9 }
                                : { opacity: [0.6, 1, 0.6], scale: [0.92, 1.12, 0.92] }
                            }
                            transition={
                              prefersReducedMotion
                                ? undefined
                                : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                            }
                            className="absolute w-[0.26em] h-[0.26em] text-[#C9A15A] -translate-x-[0.08em]"
                          >
                            <path
                              d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                              fill="currentColor"
                            />
                          </motion.svg>
                        )}
                      </span>
                    ))}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center w-6 h-6 rounded-[3px] bg-[#B3262E] text-[10px] font-jp text-[#F3E9DC] shadow-[inset_0_0_0_1px_rgba(243,233,220,0.28)]"
                  >
                    月
                  </span>
                </div>

                {/* Expressive Mixed Italic Editorial Headline (Sushila Rhythm) */}
                <h1
                  id="luno-hero-heading"
                  className="font-display font-light text-[clamp(2.5rem,10vw,5.25rem)] leading-[1.03] tracking-[0.02em] text-[#F3E9DC] text-balance"
                >
                  Creating{' '}
                  <span className="italic text-[#C9A15A]">Timeless</span>{' '}
                  <span className="block">Memories.</span>
                </h1>
              </motion.div>

              <motion.p
                {...revealAnim(2)}
                className="font-body text-sm sm:text-[15px] font-light leading-relaxed text-[#F3E9DC]/75 max-w-md"
              >
                {LUNO_BRAND.address}. Contemporary Japanese kaiseki craft and
                unhurried hospitality, arriving soon along the waterfront.
              </motion.p>

              {/* Primary & Secondary CTAs */}
              <motion.div
                {...revealAnim(3)}
                className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-6 pt-1"
              >
                <Link
                  to={siteData.hero.primaryCta.to}
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] border border-[#C9A15A] text-xs font-normal tracking-[0.24em] uppercase text-[#F3E9DC] whitespace-nowrap transition-colors duration-300"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#C9A15A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <span className="relative z-10 group-hover:text-[#2B0A10] transition-colors duration-200">
                    {siteData.hero.primaryCta.label}
                  </span>
                  <ArrowRight
                    className="relative z-10 w-3.5 h-3.5 text-[#C9A15A] group-hover:text-[#2B0A10] group-hover:translate-x-0.5 transition-all duration-200"
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  to={siteData.hero.secondaryCta.to}
                  className="inline-flex items-center justify-center sm:justify-start px-3 py-2.5 min-h-[44px] border-b border-[#C9A15A]/45 text-xs font-light tracking-[0.24em] uppercase text-[#F3E9DC]/85 hover:text-[#C9A15A] hover:border-[#C9A15A] transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  {siteData.hero.secondaryCta.label}
                </Link>
              </motion.div>

              {/* Interactive Dish Medallion Selector Strip (Inspired by Sushila/Samurai Circular Row) */}
              <motion.div
                {...revealAnim(4)}
                className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3.5 sm:gap-4"
              >
                <div
                  role="tablist"
                  aria-label="Featured dish preview"
                  className="flex items-center -space-x-2 shrink-0"
                >
                  {SPOTLIGHT_DISHES.map((dish, idx) => {
                    const isSelected = idx === activeIndex;
                    return (
                      <button
                        key={dish.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-label={`Preview ${dish.name}`}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative w-11 h-11 rounded-full overflow-hidden border transition-all duration-300 focus-visible:outline-1 focus-visible:outline-[#C9A15A] ${
                          isSelected
                            ? 'border-[#C9A15A] scale-110 z-10 shadow-[0_0_0_2px_rgba(43,10,16,0.9)]'
                            : 'border-[#C9A15A]/35 opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover block"
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="min-w-[170px] flex-1 pl-3 border-l border-[#C9A15A]/25">
                  <p className="font-display text-base sm:text-lg font-light text-[#F3E9DC] truncate">
                    {activeDish.name}
                  </p>
                  <p className="font-body text-[10px] sm:text-[11px] font-light tracking-[0.16em] uppercase text-[#C9A15A] tabular-nums">
                    {activeDish.course} · {activeDish.priceLabel}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Center Slim Vertical Japanese Kanji Column (Sushi Samurai Inspiration) */}
            <motion.div
              {...revealAnim(2)}
              aria-hidden="true"
              className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center gap-5 py-6"
            >
              <span className="w-px h-20 bg-gradient-to-b from-transparent to-[#C9A15A]/45" />
              <p className="vertical-text-rl font-jp text-sm font-light tracking-[0.45em] text-[#C9A15A]/75">
                月乃 · 旬の味わい · おもてなし
              </p>
              <span className="w-px h-20 bg-gradient-to-t from-transparent to-[#C9A15A]/45" />
            </motion.div>

            {/* Right Stage: Floating Interactive Japanese Culinary Plates (Sushila + Samurai Motion) */}
            <motion.div
              {...revealAnim(2)}
              style={
                prefersReducedMotion || !isDesktopPointer
                  ? undefined
                  : { x: plateMouseX, y: plateMouseY }
              }
              className="lg:col-span-5 relative flex flex-col items-center justify-center pt-2 pb-4 sm:py-8 lg:py-10"
            >
              {/* Mobile/Tablet Japanese Kanji Signature Strip */}
              <div
                aria-hidden="true"
                className="flex lg:hidden items-center gap-3 mb-4 text-[11px] font-jp tracking-[0.35em] text-[#C9A15A]/75"
              >
                <span className="h-px w-8 bg-[#C9A15A]/35" />
                <span>月乃 · 旬の味わい · おもてなし</span>
                <span className="h-px w-8 bg-[#C9A15A]/35" />
              </div>

              <div className="relative w-[248px] h-[248px] sm:w-[380px] sm:h-[380px] xl:w-[440px] xl:h-[440px] flex items-center justify-center">
                {/* Rotating Gold Enso & Dashed Lunar Orbit */}
                <motion.svg
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden="true"
                  animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 64, repeat: Infinity, ease: 'linear' }
                  }
                  className="absolute inset-0 w-full h-full text-[#C9A15A]"
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="192"
                    stroke="currentColor"
                    strokeWidth="0.7"
                    strokeDasharray="4 8"
                    opacity="0.32"
                  />
                  <path
                    d="M210 18 C306 16, 382 95, 381 198 C380 302, 298 382, 195 382 C95 382, 18 302, 19 200"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.45"
                  />
                </motion.svg>

                {/* Diagonal Gold Hashi / Architectural Brush Lines (Sushi Samurai Inspiration) */}
                <svg
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-3 sm:-inset-4 w-[calc(100%+1.5rem)] sm:w-[calc(100%+2rem)] h-[calc(100%+1.5rem)] sm:h-[calc(100%+2rem)] text-[#C9A15A]/30"
                >
                  <line x1="250" y1="30" x2="395" y2="115" stroke="currentColor" strokeWidth="0.9" />
                  <line x1="265" y1="45" x2="405" y2="128" stroke="currentColor" strokeWidth="0.6" />
                </svg>

                {/* Primary Floating Circular Dish Plate */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { y: [0, -8, 0] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="relative w-[78%] h-[78%] rounded-full border border-[#C9A15A]/55 bg-[#23060B] p-1.5 sm:p-2 shadow-[0_28px_70px_rgba(0,0,0,0.6)]"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeDish.id}
                        src={activeDish.image}
                        alt={activeDish.name}
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 1.06, rotate: -2 }
                        }
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.96, rotate: 2 }
                        }
                        transition={{ duration: 0.55, ease: SHOJI_EASE }}
                        className="w-full h-full object-cover block"
                      />
                    </AnimatePresence>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-[#C9A15A]/30"
                    />
                  </div>
                </motion.div>

                {/* Orbiting Secondary Plate Top-Left */}
                <motion.button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex + 1) % SPOTLIGHT_DISHES.length)
                  }
                  aria-label={`Spotlight ${secondaryLeft.name}`}
                  animate={
                    prefersReducedMotion ? undefined : { y: [0, 6, 0] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 5.2, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="block absolute -top-1 left-0 sm:left-2 w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-[#C9A15A]/55 bg-[#2B0A10] p-1 shadow-xl hover:border-[#C9A15A] hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={secondaryLeft.image}
                    alt={secondaryLeft.name}
                    className="w-full h-full rounded-full object-cover block"
                  />
                </motion.button>

                {/* Orbiting Secondary Plate Bottom-Right + Kanji Stamp */}
                <motion.button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex + 2) % SPOTLIGHT_DISHES.length)
                  }
                  aria-label={`Spotlight ${secondaryRight.name}`}
                  animate={
                    prefersReducedMotion ? undefined : { y: [0, -6, 0] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 5.8, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="block absolute bottom-0 sm:bottom-2 right-0 sm:-right-1 w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-[#C9A15A]/55 bg-[#2B0A10] p-1 shadow-xl hover:border-[#C9A15A] hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={secondaryRight.image}
                    alt={secondaryRight.name}
                    className="w-full h-full rounded-full object-cover block"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 -left-1 w-6 h-6 sm:w-7 sm:h-7 rounded-[3px] bg-[#B3262E] border border-[#F3E9DC]/30 flex items-center justify-center font-jp text-[10px] sm:text-xs text-[#F3E9DC]"
                  >
                    {activeDish.kanji}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        {...revealAnim(4)}
        className="relative z-20 flex flex-col items-center justify-center"
      >
        <button
          type="button"
          onClick={onScrollCueClick}
          aria-label="Scroll to featured menu selection"
          className="group flex flex-col items-center justify-center min-w-[44px] min-h-[48px] px-3 py-1 focus-visible:outline-1 focus-visible:outline-[#C9A15A]"
        >
          <span className="sr-only">Scroll down</span>
          <span className="relative block w-px h-10 bg-[#C9A15A]/22 overflow-hidden">
            <motion.span
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? { opacity: 0.8, y: 0 }
                  : {
                      scaleY: [0, 1, 1, 0],
                      y: ['0%', '0%', '100%', '100%'],
                      opacity: [0.35, 1, 0.85, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 2.6, repeat: Infinity, ease: SHOJI_EASE }
              }
              className="block w-full h-full bg-[#C9A15A] origin-top"
            />
          </span>
        </button>
      </motion.div>
    </section>
  );
}
