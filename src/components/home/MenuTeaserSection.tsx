import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { menuData } from '../../../data/menu.js';
import { siteData } from '../../../data/site.js';

const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;

export function MenuTeaserSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="menu-teaser"
      aria-labelledby="menu-teaser-heading"
      className="relative py-16 sm:py-20 lg:py-24 border-t border-[#C9A15A]/18"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
        {/* Alternating Left-Aligned Header + Explore Link */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { duration: 0.85, ease: SHOJI_EASE }
          }
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-10 sm:mb-12"
        >
          <div>
            <p className="font-body text-[11px] font-light tracking-[0.34em] uppercase text-[#C9A15A] mb-3">
              {siteData.menuTeaser.eyebrow}
            </p>
            <h2
              id="menu-teaser-heading"
              className="font-display font-light text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.12] tracking-[0.04em] text-[#F3E9DC]"
            >
              {siteData.menuTeaser.heading}
            </h2>
          </div>

          <Link
            to={siteData.menuTeaser.ctaTo}
            className="group self-start md:self-auto inline-flex items-center gap-3 py-2 min-h-[44px] border-b border-[#C9A15A]/45 font-body text-xs font-light tracking-[0.26em] uppercase text-[#C9A15A] hover:text-[#F3E9DC] hover:border-[#F3E9DC] transition-colors whitespace-nowrap shrink-0"
          >
            <span>{siteData.menuTeaser.ctaLabel}</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        {/* Horizontal 3-Dish Featured Strip (Data + Images from /data/menu.js) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {menuData.featuredDishes.map((dish, idx) => (
            <motion.article
              key={dish.id}
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.2 }
                  : { duration: 0.8, delay: idx * 0.1, ease: SHOJI_EASE }
              }
              className="group border border-[#C9A15A]/22 bg-[#4A121C]/22 flex flex-col justify-between overflow-hidden"
            >
              <Link
                to="/menu"
                className="flex flex-col h-full focus-visible:outline-1 focus-visible:outline-[#C9A15A]"
              >
                {/* Dish Image Frame */}
                {dish.image && (
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden border-b border-[#C9A15A]/20 bg-[#2B0A10]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        prefersReducedMotion ? '' : 'group-hover:scale-105'
                      }`}
                    />
                  </div>
                )}

                <div className="p-5 sm:p-7 lg:p-8 flex-1 flex flex-col justify-between gap-4 sm:gap-5">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-light tracking-[0.22em] uppercase text-[#C9A15A]/85">
                    <span>{dish.course}</span>
                    <span className="tabular-nums text-[#F3E9DC]/85">
                      {dish.tag}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-2xl sm:text-[26px] font-light tracking-[0.03em] text-[#F3E9DC] group-hover:text-[#C9A15A] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="font-body text-xs sm:text-[13px] font-light leading-relaxed text-[#F3E9DC]/72">
                      {dish.note}
                    </p>
                  </div>

                  {dish.ingredients && dish.ingredients.length > 0 && (
                    <p className="pt-3 border-t border-[#C9A15A]/15 font-body text-[11px] font-light text-[#F3E9DC]/60">
                      {dish.ingredients.join(' · ')}
                    </p>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
