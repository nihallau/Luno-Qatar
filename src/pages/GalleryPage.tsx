import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Film,
  Maximize2,
  X,
} from 'lucide-react';
import { galleryData } from '../../data/gallery.js';

const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  caption: string;
  aspect: string;
  image?: string;
  isPlaceholder: boolean;
  motif: string;
}

function getAspectClass(aspect: string): string {
  switch (aspect) {
    case '4/3':
      return 'aspect-[4/3]';
    case '4/5':
      return 'aspect-[4/5]';
    case '1/1':
      return 'aspect-square';
    case '3/4':
    default:
      return 'aspect-[3/4]';
  }
}

/**
 * Tasteful burgundy & gold abstract placeholder with moon or seigaiha wave motifs.
 */
function AbstractPlaceholderArtwork({
  motif,
  title,
  large = false,
}: {
  motif: string;
  title: string;
  large?: boolean;
}) {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col justify-between p-5 sm:p-6 select-none"
      style={{
        background:
          motif === 'wave'
            ? 'radial-gradient(ellipse at 30% 25%, #4A121C 0%, #330B12 55%, #23060B 100%)'
            : 'radial-gradient(ellipse at 70% 30%, #4A121C 0%, #2F0A11 58%, #21060B 100%)',
      }}
    >
      {/* Subtle Wave or Moon SVG Motif */}
      {motif === 'wave' ? (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-[0.14] text-[#C9A15A]"
        >
          <defs>
            <pattern
              id={`gal-wave-${title.replace(/\s+/g, '-')}`}
              width="64"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <g fill="none" stroke="currentColor" strokeWidth="0.75">
                <circle cx="32" cy="32" r="28" />
                <circle cx="32" cy="32" r="20" />
                <circle cx="32" cy="32" r="12" />
                <circle cx="0" cy="16" r="28" />
                <circle cx="0" cy="16" r="20" />
                <circle cx="64" cy="16" r="28" />
                <circle cx="64" cy="16" r="20" />
              </g>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#gal-wave-${title.replace(/\s+/g, '-')})`}
          />
        </svg>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <svg
            viewBox="0 0 120 120"
            fill="none"
            className={`${
              large ? 'w-40 h-40 sm:w-52 sm:h-52' : 'w-24 h-24 sm:w-28 sm:h-28'
            } text-[#C9A15A]/45`}
          >
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeDasharray="3 5"
              opacity="0.55"
            />
            <path
              d="M68 26C52.5 29.4 41 43.2 41 59.5C41 78.3 56.2 93.5 75 93.5C80.8 93.5 86.3 92 91.1 89.4C79 88.6 69.2 78.6 69.2 66.3C69.2 53.9 79.3 43.8 91.8 43.2C86.9 33 78.2 27.6 68 26Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.08"
            />
          </svg>
        </div>
      )}

      <div className="relative z-10 flex items-center justify-between text-[10px] font-light tracking-[0.28em] uppercase text-[#C9A15A]/80">
        <span>Placeholder</span>
        <span>LUNO</span>
      </div>

      <div className="relative z-10">
        <p className="font-display italic text-lg sm:text-xl font-light text-[#F3E9DC]/85">
          {title}
        </p>
      </div>
    </div>
  );
}

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onOpen: (item: GalleryItem) => void;
}

function GalleryCard({ item, index, onOpen }: GalleryCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const hasPhoto = Boolean(item.image && item.image.trim().length > 0 && !failed);

  return (
    <motion.figure
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.15 }
          : {
              duration: 0.65,
              delay: Math.min((index % 3) * 0.08, 0.24),
              ease: SHOJI_EASE,
            }
      }
      className="break-inside-avoid mb-5 sm:mb-6"
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`Open ${item.title} in lightbox`}
        className="group relative block w-full text-left border border-[#C9A15A]/30 hover:border-[#C9A15A]/80 bg-[#2B0A10] overflow-hidden transition-colors duration-300 focus-visible:outline-1 focus-visible:outline-[#C9A15A]"
      >
        <div className={`relative w-full ${getAspectClass(item.aspect)} overflow-hidden`}>
          {hasPhoto ? (
            <>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                className={`w-full h-full object-cover block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  loaded || prefersReducedMotion
                    ? 'opacity-100 blur-0 scale-100'
                    : 'opacity-0 blur-md scale-[1.03]'
                } ${prefersReducedMotion ? '' : 'group-hover:scale-[1.04]'}`}
              />
              {/* Subtle vignette scrim for caption legibility */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0408]/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"
              />
              <span
                aria-hidden="true"
                className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 border border-[#C9A15A]/45 bg-[#2B0A10]/70 text-[#C9A15A] opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
              >
                <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.3} />
              </span>
            </>
          ) : (
            <AbstractPlaceholderArtwork motif={item.motif} title={item.title} />
          )}
        </div>

        {/* Restrained Caption Bar */}
        <figcaption className="px-5 py-4 border-t border-[#C9A15A]/18 flex items-baseline justify-between gap-4">
          <div className="min-w-0">
            <span className="block font-body text-[10px] font-light tracking-[0.26em] uppercase text-[#C9A15A]/80 mb-1">
              {item.category}
              {item.isPlaceholder ? ' · Placeholder' : ''}
            </span>
            <span className="block font-display text-lg font-light text-[#F3E9DC] group-hover:text-[#C9A15A] transition-colors truncate">
              {item.title}
            </span>
          </div>
        </figcaption>
      </button>
    </motion.figure>
  );
}

export function GalleryPage() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Hide any empty category automatically
  const visibleCategories = useMemo(() => {
    const nonEmptyIds = new Set(galleryData.items.map((item) => item.category));
    return galleryData.categories.filter(
      (cat) => cat.id === 'all' || nonEmptyIds.has(cat.id)
    );
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return galleryData.items;
    return galleryData.items.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] ?? null : null;

  const openLightbox = useCallback(
    (item: GalleryItem) => {
      const idx = filteredItems.findIndex((entry) => entry.id === item.id);
      if (idx >= 0) setLightboxIndex(idx);
    },
    [filteredItems]
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  // Keyboard navigation inside lightbox (Esc, Left, Right)
  useEffect(() => {
    if (lightboxIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeLightbox, lightboxIndex, showNext, showPrev]);

  return (
    <div className="relative pt-24 pb-20 sm:pt-32 lg:pt-36 sm:pb-28">
      {/* Header & Filter Bar */}
      <header className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 pb-10 sm:pb-12">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { duration: 0.85, ease: SHOJI_EASE }
          }
          className="max-w-3xl"
        >
          <p className="font-body text-[11px] font-light tracking-[0.34em] uppercase text-[#C9A15A] mb-3 sm:mb-4">
            {galleryData.eyebrow}
          </p>
          <h1 className="font-display font-light text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.06] tracking-[0.06em] text-[#F3E9DC] mb-5 sm:mb-6">
            {galleryData.title}
          </h1>
          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 1.0, delay: 0.15, ease: SHOJI_EASE }
            }
            className="h-px w-full max-w-md bg-[#C9A15A]/65 origin-left mb-5 sm:mb-6"
          />
          <p className="font-body text-sm sm:text-[15px] font-light leading-relaxed text-[#F3E9DC]/75 max-w-xl">
            {galleryData.subtitle}
          </p>
        </motion.div>

        {/* Category Filter Buttons (Empty categories automatically hidden) */}
        <div
          role="group"
          aria-label="Filter gallery by category"
          className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#C9A15A]/18 flex flex-wrap items-center gap-2 sm:gap-2.5"
        >
          {visibleCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 min-h-[44px] sm:min-h-[40px] border text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'border-[#C9A15A] bg-[#C9A15A]/15 text-[#F3E9DC]'
                    : 'border-[#C9A15A]/24 text-[#F3E9DC]/65 hover:border-[#C9A15A]/60 hover:text-[#F3E9DC]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Masonry-Style Gallery Grid */}
      <section
        aria-label="Gallery masonry collection"
        className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 pb-16 sm:pb-28"
      >
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={idx}
                onOpen={openLightbox}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Ambience Reel Video Loop Slot */}
      <section
        aria-labelledby="ambience-reel-heading"
        className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 pb-16 sm:pb-28"
      >
        <div className="border border-[#C9A15A]/28 bg-[#4A121C]/22 p-5 sm:p-10 lg:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-body text-[11px] font-light tracking-[0.34em] uppercase text-[#C9A15A] mb-2">
                {galleryData.ambienceReel.eyebrow}
              </p>
              <h2
                id="ambience-reel-heading"
                className="font-display text-3xl sm:text-4xl font-light text-[#F3E9DC]"
              >
                {galleryData.ambienceReel.title}
              </h2>
            </div>
            <p className="font-body text-xs font-light text-[#F3E9DC]/65 max-w-md">
              {galleryData.ambienceReel.caption}
            </p>
          </div>

          <div className="relative aspect-[16/9] max-h-[520px] w-full border border-[#C9A15A]/30 bg-[#23060B] overflow-hidden">
            {galleryData.ambienceReel.videoSrc ? (
              <video
                src={galleryData.ambienceReel.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover block"
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <AbstractPlaceholderArtwork
                  motif="wave"
                  title="Ambience Reel — Video Loop Slot (Muted · PlaysInline)"
                  large
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
                  <span className="inline-flex items-center justify-center w-12 h-12 border border-[#C9A15A]/50 bg-[#2B0A10]/80 text-[#C9A15A] mb-3">
                    <Film className="w-5 h-5" strokeWidth={1.2} />
                  </span>
                  <span className="font-body text-[11px] tracking-[0.28em] uppercase text-[#C9A15A]">
                    Coming Soon · Video Loop Ready
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Instagram Feed Strip Placeholder */}
      <section
        aria-labelledby="gallery-instagram-heading"
        className="border-t border-[#C9A15A]/18 pt-14 sm:pt-20 mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="font-body text-[11px] font-light tracking-[0.34em] uppercase text-[#C9A15A] mb-2">
              {galleryData.instagramStrip.eyebrow}
            </p>
            <h2
              id="gallery-instagram-heading"
              className="font-display text-2xl sm:text-3xl font-light text-[#F3E9DC]"
            >
              From Porto Arabia
            </h2>
          </div>

          <a
            href={galleryData.instagramStrip.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group self-start sm:self-auto inline-flex items-center gap-2 py-2 min-h-[44px] border-b border-[#C9A15A]/45 font-body text-xs font-light tracking-[0.24em] uppercase text-[#C9A15A] hover:text-[#F3E9DC] hover:border-[#F3E9DC] transition-colors whitespace-nowrap"
          >
            <span>Follow {galleryData.instagramStrip.handle}</span>
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {galleryData.instagramStrip.tiles.map((tile) => (
            <a
              key={tile.id}
              href={galleryData.instagramStrip.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tile.label} — Follow ${galleryData.instagramStrip.handle}`}
              className="group relative aspect-square border border-[#C9A15A]/28 bg-[#2B0A10] overflow-hidden"
            >
              <img
                src={tile.image}
                alt={`LUNO Qatar ${tile.label}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  prefersReducedMotion ? '' : 'group-hover:scale-105'
                }`}
              />
              <span className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-3 px-2 py-0.5 bg-[#2B0A10]/85 border border-[#C9A15A]/25 font-body text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#C9A15A] max-w-[calc(100%-1rem)] truncate">
                {tile.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Full-Screen Burgundy Lightbox with Keyboard & Mobile Swipe Support */}
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
            {/* Lightbox Top Controls */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between text-xs font-light tracking-[0.24em] uppercase text-[#C9A15A]"
            >
              <span className="tabular-nums">
                {(lightboxIndex ?? 0) + 1} / {filteredItems.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="inline-flex items-center gap-2 px-3 py-2 min-h-[44px] text-[#C9A15A] hover:text-[#F3E9DC] transition-colors"
              >
                <span>Close</span>
                <X className="w-5 h-5" strokeWidth={1.3} aria-hidden="true" />
              </button>
            </div>

            {/* Center Swipeable Frame */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-4 sm:gap-8 min-h-0 py-4"
            >
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous gallery item"
                className="hidden sm:inline-flex items-center justify-center w-11 h-11 border border-[#C9A15A]/35 text-[#C9A15A] hover:border-[#C9A15A] hover:bg-[#C9A15A]/12 transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.3} aria-hidden="true" />
              </button>

              <motion.div
                key={activeLightboxItem.id}
                drag={prefersReducedMotion ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.22}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -55) {
                    showNext();
                  } else if (info.offset.x > 55) {
                    showPrev();
                  }
                }}
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
                }
                transition={{ duration: 0.3, ease: SHOJI_EASE }}
                className="relative max-w-3xl w-full max-h-[64dvh] sm:max-h-[68dvh] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
              >
                <div className="relative border border-[#C9A15A]/55 bg-[#2B0A10] overflow-hidden max-h-[64dvh] sm:max-h-[68dvh] w-auto">
                  {activeLightboxItem.image ? (
                    <img
                      src={activeLightboxItem.image}
                      alt={activeLightboxItem.title}
                      referrerPolicy="no-referrer"
                      className="max-h-[62dvh] sm:max-h-[66dvh] w-auto max-w-full object-contain block"
                    />
                  ) : (
                    <div className="w-[min(86vw,520px)] aspect-[4/3]">
                      <AbstractPlaceholderArtwork
                        motif={activeLightboxItem.motif}
                        title={activeLightboxItem.title}
                        large
                      />
                    </div>
                  )}
                </div>
              </motion.div>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next gallery item"
                className="hidden sm:inline-flex items-center justify-center w-11 h-11 border border-[#C9A15A]/35 text-[#C9A15A] hover:border-[#C9A15A] hover:bg-[#C9A15A]/12 transition-colors shrink-0"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.3} aria-hidden="true" />
              </button>
            </div>

            {/* Bottom Caption + Mobile Prev/Next Controls */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto max-w-2xl w-full text-center space-y-2.5 sm:space-y-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
            >
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#C9A15A]">
                {activeLightboxItem.category}
                {activeLightboxItem.isPlaceholder ? ' · Placeholder' : ''}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-[#F3E9DC]">
                {activeLightboxItem.title}
              </h2>
              <p className="font-body text-xs sm:text-sm font-light text-[#F3E9DC]/75">
                {activeLightboxItem.caption}
              </p>

              <div className="flex sm:hidden items-center justify-center gap-6 pt-2">
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous gallery item"
                  className="inline-flex items-center justify-center w-12 h-11 border border-[#C9A15A]/35 text-[#C9A15A]"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.3} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next gallery item"
                  className="inline-flex items-center justify-center w-12 h-11 border border-[#C9A15A]/35 text-[#C9A15A]"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={1.3} aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
