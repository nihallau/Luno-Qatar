import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { siteData } from '../../../data/site.js';
import { EnsoCircle } from '../motifs/JapaneseMotifs';

const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;

export function ReservationCtaSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="reserve-cta"
      aria-labelledby="reserve-cta-heading"
      className="relative pt-8 sm:pt-10 lg:pt-12 pb-14 sm:pb-16 overflow-hidden"
    >
      {/* Subtle Ambient Gold Enso Centered Behind Call to Action */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25"
      >
        <EnsoCircle className="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] text-[#C9A15A]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 text-center">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.15, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { duration: 0.75, ease: SHOJI_EASE }
          }
          className="max-w-2xl mx-auto flex flex-col items-center"
        >
          <p className="font-body text-[11px] font-light tracking-[0.36em] uppercase text-[#C9A15A] mb-4">
            {siteData.reservationBand.eyebrow}
          </p>

          <h2
            id="reserve-cta-heading"
            className="font-display font-light text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.08] tracking-[0.05em] text-[#F3E9DC] mb-5 sm:mb-6 text-balance"
          >
            {siteData.reservationBand.heading}
          </h2>

          <p className="font-body text-sm sm:text-[15px] font-light leading-relaxed text-[#F3E9DC]/75 mb-8 sm:mb-10 max-w-md">
            {siteData.reservationBand.subcopy}
          </p>

          {/* Big Outlined Gold Button with Brush-Sweep Hover Fill */}
          <Link
            to={siteData.reservationBand.ctaTo}
            className="group relative overflow-hidden inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-14 py-4 min-h-[52px] border border-[#C9A15A] text-xs sm:text-[13px] font-normal tracking-[0.26em] uppercase text-[#C9A15A] whitespace-nowrap transition-colors duration-300"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[#C9A15A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
            <span className="relative z-10 group-hover:text-[#2B0A10] transition-colors duration-200">
              {siteData.reservationBand.ctaLabel}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
