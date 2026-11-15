import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X } from 'lucide-react';
import { galleryData } from '../../../data/gallery.js';
import { siteData } from '../../../data/site.js';
import {
  SHOJI_EASE,
  ShojiReveal,
  ShojiStaggerItem,
} from '../motifs/ShojiReveal';

interface GalleryEntry {
  id: string;
  category: string;
  title: string;
  caption: string;
  aspect: string;
  image?: string;
  imageClassName?: string;
}

const HOME_FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'interior', label: 'Interior' },
  { id: 'atmosphere', label: 'Atmosphere' },
  { id: 'food', label: 'Culinary' },
] as const;

export function GallerySection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const previewItems = useMemo(() => {
    const items = galleryData.items as GalleryEntry[];
    if (activeFilter === 'all') {
      // Curated showcase prioritizing restaurant spaces alongside culinary craft
      return items.slice(0, 6);
    }
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const activeLightboxItem =
    lightboxIndex !== null ? previewItems[lightboxIndex] ?? null : null;

  const openLightbox = useCallback(
    (item: GalleryEntry) => {
      const idx = previewItems.findIndex((entry) => entry.id === item.id);
      if (idx >= 0) setLightboxIndex(idx);
    },
    [previewItems]
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || previewItems.length === 0) return null;
      return (prev - 1 + previewItems.length) % previewItems.length;
    });
  }, [previewItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || previewItems.length === 0) return null;
      return (prev + 1) % previewItems.length;
    });
  }, [previewItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') showNext();
      else if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeLightbox, lightboxIndex, showNext, showPrev]);

  return (
    <section
      id="gallery"
      aria-labelledby="home-gallery-heading"
      className="relative py-16 sm:py-24 lg:py-32 border-t border-[#C9A15A]/18 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
        {/* Shoji Header + Filter Row */}
        <ShojiReveal
          direction="left"
          duration={0.95}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12"
        >
          <div className="max-w-2xl">
            <p className="font-body text-[11px] font-light tracking-[0.34em] uppercase text-[#C9A15A] mb-3">
              {siteData.gallerySection.eyebrow}
            </p>
            <h2
              id="home-gallery-heading"
              className="font-display font-light text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.08] tracking-[0.04em] text-[#F3E9DC] mb-4"
            >
              {siteData.gallerySection.heading}
            </h2>
            <p className="font-body text-sm font-light leading-relaxed text-[#F3E9DC]/72">
              {siteData.gallerySection.subcopy}
            </p>
          </div>

          <Link
            to={siteData.gallerySection.ctaTo}
            className="group inline-flex items-center gap-2.5 py-2 min-h-[44px] border-b border-[#C9A15A]/45 font-body text-xs font-light tracking-[0.26em] uppercase text-[#C9A15A] hover:text-[#F3E9DC] hover:border-[#F3E9DC] transition-colors whitespace-nowrap shrink-0"
          >
            <span>{siteData.gallerySection.ctaLabel}</span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </Link>
        </ShojiReveal>

        {/* Interactive Space Filter Controls */}
        <ShojiReveal
          direction="left"
          delay={0.08}
          showKumikoLine={false}
          className="mb-10 pb-6 border-b border-[#C9A15A]/15 flex flex-wrap items-center gap-2.5"
        >
          <div
            role="group"
            aria-label="Filter restaurant gallery preview"
            className="flex flex-wrap items-center gap-2.5"
          >
            {HOME_FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setLightboxIndex(null);
                  }}
                  className={`px-4 py-2 min-h-[40px] border text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#C9A15A] bg-[#C9A15A]/15 text-[#F3E9DC]'
                      : 'border-[#C9A15A]/24 text-[#F3E9DC]/65 hover:border-[#C9A15A]/60 hover:text-[#F3E9DC]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </ShojiReveal>

        {/* Architectural Japanese Bento Gallery Grid with Staggered Shoji Unfolding */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7">
          {previewItems.map((item, idx) => {
            const isWideFeature =
              activeFilter === 'all' && (idx === 0 || idx === 3 || idx === 4);
            const colSpanClass =
              activeFilter === 'all'
                ? isWideFeature
                  ? 'md:col-span-7'
                  : 'md:col-span-5'
                : idx % 3 === 0
                  ? 'md:col-span-6'
                  : 'md:col-span-6';

            return (
              <ShojiStaggerItem
                key={item.id}
                index={idx}
                staggerStep={0.09}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                className={colSpanClass}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(item)}
                  aria-label={`Inspect ${item.title}`}
                  className="group relative block w-full h-[300px] sm:h-[340px] lg:h-[380px] text-left border border-[#C9A15A]/30 hover:border-[#C9A15A]/85 bg-[#23060B] overflow-hidden transition-colors duration-300 focus-visible:outline-1 focus-visible:outline-[#C9A15A]"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${
                        item.imageClassName ?? 'object-center'
                      } block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        prefersReducedMotion ? '' : 'group-hover:scale-105'
                      }`}
                    />
                  )}

                  {/* Measured Bottom Gradient Scrim */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#160407]/90 via-[#1E060A]/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute top-3.5 right-3.5 inline-flex items-center justify-center w-9 h-9 border border-[#C9A15A]/45 bg-[#2B0A10]/75 text-[#C9A15A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.3} />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end">
                    <span className="font-body text-[10px] font-light tracking-[0.28em] uppercase text-[#C9A15A] mb-1">
                      {item.category === 'food' ? 'Culinary' : item.category}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-light text-[#F3E9DC] group-hover:text-[#C9A15A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-body text-xs font-light text-[#F3E9DC]/72 line-clamp-2 max-w-lg">
                      {item.caption}
                    </p>
                  </div>
                </button>
              </ShojiStaggerItem>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal for Restaurant Gallery Preview */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#1B0509]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between text-xs font-light tracking-[0.24em] uppercase text-[#C9A15A]"
            >
              <span className="tabular-nums">
                {(lightboxIndex ?? 0) + 1} / {previewItems.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close gallery preview"
                className="inline-flex items-center gap-2 px-3 py-2 min-h-[44px] text-[#C9A15A] hover:text-[#F3E9DC] transition-colors"
              >
                <span>Close</span>
                <X className="w-5 h-5" strokeWidth={1.3} aria-hidden="true" />
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-4 sm:gap-8 min-h-0 py-4"
            >
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous restaurant photograph"
                className="hidden sm:inline-flex items-center justify-center w-11 h-11 border border-[#C9A15A]/35 text-[#C9A15A] hover:border-[#C9A15A] hover:bg-[#C9A15A]/12 transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.3} aria-hidden="true" />
              </button>

              <motion.div
                key={activeLightboxItem.id}
                drag={prefersReducedMotion ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -55) showNext();
                  else if (info.offset.x > 55) showPrev();
                }}
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
                }
                transition={{ duration: 0.3, ease: SHOJI_EASE }}
                className="relative max-w-4xl w-full max-h-[68dvh] flex items-center justify-center"
              >
                {activeLightboxItem.image && (
                  <div className="border border-[#C9A15A]/55 bg-[#2B0A10] overflow-hidden max-h-[68dvh]">
                    <img
                      src={activeLightboxItem.image}
                      alt={activeLightboxItem.title}
                      referrerPolicy="no-referrer"
                      className="max-h-[66dvh] w-auto max-w-full object-contain block"
                    />
                  </div>
                )}
              </motion.div>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next restaurant photograph"
                className="hidden sm:inline-flex items-center justify-center w-11 h-11 border border-[#C9A15A]/35 text-[#C9A15A] hover:border-[#C9A15A] hover:bg-[#C9A15A]/12 transition-colors shrink-0"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.3} aria-hidden="true" />
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto max-w-2xl w-full text-center space-y-2 pb-2"
            >
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#C9A15A]">
                {activeLightboxItem.category}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-[#F3E9DC]">
                {activeLightboxItem.title}
              </h3>
              <p className="font-body text-xs sm:text-sm font-light text-[#F3E9DC]/75">
                {activeLightboxItem.caption}
              </p>

              <div className="flex sm:hidden items-center justify-center gap-6 pt-2">
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous restaurant photograph"
                  className="inline-flex items-center justify-center w-11 h-11 border border-[#C9A15A]/35 text-[#C9A15A]"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.3} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next restaurant photograph"
                  className="inline-flex items-center justify-center w-11 h-11 border border-[#C9A15A]/35 text-[#C9A15A]"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={1.3} aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
