import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { siteData } from '../../../data/site.js';
import hamachiCrudoImg from '../../assets/images/dish_hamachi_crudo_1794762184629.jpg';
import blackCodImg from '../../assets/images/dish_black_cod_1794762186365.jpg';
import yuzuElixirImg from '../../assets/images/dish_yuzu_elixir_1794762186318.jpg';

const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;

const ATMOSPHERE_STUDIES = [
  {
    id: 'study-1',
    label: 'Study I · 間',
    subtitle: 'Candlelight & Handcrafted Stoneware',
    image: hamachiCrudoImg,
  },
  {
    id: 'study-2',
    label: 'Study II · 炎',
    subtitle: 'Binchotan Warmth & Steam',
    image: blackCodImg,
  },
  {
    id: 'study-3',
    label: 'Study III · 水',
    subtitle: 'Crystal Reflections at Dusk',
    image: yuzuElixirImg,
  },
] as const;

export function AtmosphereSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsTabletOrDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const stripParallaxX = useTransform(scrollYProgress, [0, 1], ['-2.5%', '2.5%']);
  const plateParallaxY = useTransform(scrollYProgress, [0, 1], [16, -16]);

  return (
    <section
      ref={sectionRef}
      id="atmosphere"
      aria-labelledby="atmosphere-heading"
      className="relative py-16 sm:py-24 lg:py-32 border-t border-[#C9A15A]/18 overflow-hidden"
    >
      {/* Alternating Right-Aligned Intro */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 mb-10 sm:mb-16">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { duration: 0.85, ease: SHOJI_EASE }
          }
          className="flex flex-col md:flex-row-reverse md:items-end justify-between gap-5 sm:gap-6"
        >
          <div className="md:text-right">
            <p className="font-body text-[11px] font-light tracking-[0.34em] uppercase text-[#C9A15A] mb-3">
              {siteData.atmosphere.eyebrow}
            </p>
            <h2
              id="atmosphere-heading"
              className="font-display font-light text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.12] tracking-[0.04em] text-[#F3E9DC]"
            >
              {siteData.atmosphere.heading}
            </h2>
          </div>

          <Link
            to={siteData.atmosphere.ctaTo}
            className="group self-start md:self-auto inline-flex items-center gap-2.5 py-2 min-h-[44px] border-b border-[#C9A15A]/45 font-body text-xs font-light tracking-[0.26em] uppercase text-[#C9A15A] hover:text-[#F3E9DC] hover:border-[#F3E9DC] transition-colors whitespace-nowrap shrink-0"
          >
            <span>{siteData.atmosphere.ctaLabel}</span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>

      {/* Full-Width Parallax Photographic Atmosphere Band */}
      <div className="relative w-full border-y border-[#C9A15A]/22 bg-[#23060B]/75 py-8 sm:py-14">
        <motion.div
          style={
            prefersReducedMotion || !isTabletOrDesktop
              ? undefined
              : { x: stripParallaxX }
          }
          className="mx-auto max-w-[1600px] px-4 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7"
        >
          {ATMOSPHERE_STUDIES.map((frame, index) => (
            <motion.div
              key={frame.id}
              style={
                prefersReducedMotion || !isTabletOrDesktop || index !== 1
                  ? undefined
                  : { y: plateParallaxY }
              }
              className="group relative aspect-[16/10] border border-[#C9A15A]/30 overflow-hidden flex flex-col justify-between p-5 sm:p-7 bg-[#2B0A10]"
            >
              <img
                src={frame.image}
                alt={frame.subtitle}
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover opacity-55 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  prefersReducedMotion
                    ? ''
                    : 'group-hover:scale-105 group-hover:opacity-75'
                }`}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#1B0509]/92 via-[#2B0A10]/45 to-[#1B0509]/55"
              />

              <div className="relative z-10 flex items-center justify-between text-[10px] tracking-[0.28em] uppercase text-[#C9A15A]">
                <span>{frame.label}</span>
                <span>{siteData.location.shortLabel}</span>
              </div>

              <div className="relative z-10">
                <p className="font-display italic text-xl sm:text-2xl font-light text-[#F3E9DC]">
                  {frame.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
