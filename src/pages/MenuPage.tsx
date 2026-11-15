import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Download, Image as ImageIcon, X } from 'lucide-react';
import { menuData } from '../../data/menu.js';
import { DietaryIcon, DietaryTag } from '../components/menu/DietaryIcons';

const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;

type FilterOption = 'all' | 'vegetarian' | 'vegan' | 'gluten-free';

const FILTER_OPTIONS: ReadonlyArray<{ id: FilterOption; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
];

interface MenuItemShape {
  id: string;
  name: string;
  description: string;
  ingredients?: string[];
  price: number;
  tags: string[];
  isSignature: boolean;
  isNew: boolean;
  image?: string;
}

function formatQarPrice(price: number): string {
  if (price === 0) return `${menuData.currency} 00`;
  return `${menuData.currency} ${price}`;
}

interface MenuItemRowProps {
  item: MenuItemShape;
  index: number;
  onInspectImage?: (item: MenuItemShape) => void;
}

function MenuItemRow({ item, index, onInspectImage }: MenuItemRowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(item.image && item.image.trim().length > 0);
  const ingredients = item.ingredients ?? [];

  return (
    <motion.li
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.15 }
          : {
              duration: 0.65,
              delay: Math.min(index * 0.08, 0.28),
              ease: SHOJI_EASE,
            }
      }
      className="group relative py-5 sm:py-6 border-b border-[#C9A15A]/14 last:border-b-0"
    >
      <div className="flex items-start gap-4 sm:gap-6">
        {/* Dish Photography Frame (Tall Sharp-Cornered Frame with Hover Zoom & Gold Border) */}
        {hasImage && (
          <motion.button
            type="button"
            onClick={() => onInspectImage?.(item)}
            aria-label={`Inspect ${item.name} photograph and ingredients`}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            transition={{ duration: 0.35, ease: SHOJI_EASE }}
            className="relative aspect-[3/4] w-20 sm:w-28 md:w-32 shrink-0 rounded-none border border-[#C9A15A]/38 group-hover:border-[#C9A15A] bg-[#370D14] overflow-hidden focus-visible:outline-1 focus-visible:outline-[#C9A15A] transition-colors duration-300"
          >
            {!imageFailed ? (
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className={`w-full h-full object-cover block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  prefersReducedMotion ? '' : 'group-hover:scale-105'
                }`}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 p-2 sm:p-3 text-center text-[#C9A15A]/60 h-full">
                <ImageIcon className="w-5 h-5" strokeWidth={1.2} />
                <span className="font-body text-[9px] tracking-[0.2em] uppercase">
                  {item.name}
                </span>
              </div>
            )}
          </motion.button>
        )}

        {/* Dish Copy, Animated Leader Line, Price, and Ingredients */}
        <div className="flex-1 min-w-0">
          {/* Title + Signature / New Marks + Animated Dotted Gold Leader + Price */}
          <div className="flex flex-wrap sm:flex-nowrap items-baseline justify-between gap-x-2.5 gap-y-1">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <h3 className="font-display text-xl sm:text-2xl font-light tracking-[0.03em] text-[#F3E9DC] group-hover:text-[#C9A15A] transition-colors duration-200 leading-snug">
                {item.name}
              </h3>

              {/* Signature Four-Point Gold Diamond */}
              {item.isSignature && (
                <motion.svg
                  viewBox="0 0 24 24"
                  aria-label="Signature dish"
                  role="img"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: [0.7, 1, 0.7], scale: [0.95, 1.08, 0.95] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="w-3.5 h-3.5 text-[#C9A15A] shrink-0"
                >
                  <path
                    d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                    fill="currentColor"
                  />
                </motion.svg>
              )}

              {/* New Item Vermilion Hanko Seal */}
              {item.isNew && (
                <span
                  aria-label="New dish"
                  className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-[2px] bg-[#B3262E] border border-[#B3262E] shadow-[inset_0_0_0_1px_rgba(243,233,220,0.28)] font-body text-[9px] font-normal tracking-[0.18em] uppercase text-[#F3E9DC] leading-none shrink-0"
                >
                  NEW
                </span>
              )}
            </div>

            {/* Animated Dotted Gold Leader Line */}
            <motion.span
              aria-hidden="true"
              initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.75, delay: 0.12, ease: SHOJI_EASE }
              }
              className="hidden sm:block flex-1 min-w-[24px] border-b border-dotted border-[#C9A15A]/45 mx-2 -translate-y-1 origin-left"
            />

            {/* Price in QAR */}
            <span className="font-display text-base sm:text-xl font-light tracking-[0.08em] tabular-nums text-[#C9A15A] whitespace-nowrap shrink-0">
              {formatQarPrice(item.price)}
            </span>
          </div>

          {/* Description */}
          <p className="mt-1.5 sm:mt-2 font-body text-xs sm:text-sm font-light leading-relaxed text-[#F3E9DC]/78 max-w-2xl">
            {item.description}
          </p>

          {/* Ingredients Preview & Interactive Toggle + Dietary Icons */}
          <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            {ingredients.length > 0 && (
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 min-h-[44px] sm:min-h-[36px] py-2 sm:py-1 text-left font-body text-[11px] font-light tracking-[0.18em] uppercase text-[#C9A15A]/85 hover:text-[#F3E9DC] transition-colors"
              >
                <span>
                  {expanded ? 'Hide Ingredients' : `Ingredients (${ingredients.length})`}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    expanded ? 'rotate-180' : ''
                  }`}
                  strokeWidth={1.3}
                  aria-hidden="true"
                />
              </button>
            )}

            {item.tags.length > 0 && (
              <div className="flex items-center gap-2.5 shrink-0">
                {item.tags.map((tag) => (
                  <DietaryIcon key={tag} tag={tag as DietaryTag} />
                ))}
              </div>
            )}
          </div>

          {/* Smooth Animated Ingredients Drawer */}
          <AnimatePresence initial={false}>
            {expanded && ingredients.length > 0 && (
              <motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -6 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -4 }
                }
                transition={{ duration: 0.32, ease: SHOJI_EASE }}
                className="mt-3 pt-3 border-t border-[#C9A15A]/15"
              >
                <p className="font-body text-[10px] font-light tracking-[0.26em] uppercase text-[#C9A15A]/75 mb-1.5">
                  Key Ingredients
                </p>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-light text-[#F3E9DC]/75">
                  {ingredients.map((ing, i) => (
                    <motion.span
                      key={ing}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, x: -4 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.1 }
                          : {
                              duration: 0.3,
                              delay: i * 0.04,
                              ease: SHOJI_EASE,
                            }
                      }
                      className="inline-flex items-center gap-2.5"
                    >
                      <span>{ing}</span>
                      {i < ingredients.length - 1 && (
                        <span className="text-[#C9A15A]/45" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.li>
  );
}

export function MenuPage() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    menuData.categories[0]?.id ?? 'starters'
  );
  const [inspectedDish, setInspectedDish] = useState<MenuItemShape | null>(null);
  const [pdfNotice, setPdfNotice] = useState(false);
  const pdfTimerRef = useRef<number | null>(null);

  const allNavCategories = useMemo(
    () => [
      ...menuData.categories.map((c) => ({ id: c.id, name: c.name })),
      { id: menuData.tastingMenu.id, name: menuData.tastingMenu.name },
    ],
    []
  );

  // Scroll spy via IntersectionObserver for active category tracking
  useEffect(() => {
    const sections = allNavCategories
      .map((cat) => document.getElementById(`menu-cat-${cat.id}`))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const id = visible[0].target.id.replace('menu-cat-', '');
          setActiveCategoryId(id);
        }
      },
      {
        rootMargin: '-22% 0px -62% 0px',
        threshold: 0.05,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [allNavCategories]);

  useEffect(() => {
    return () => {
      if (pdfTimerRef.current !== null) {
        window.clearTimeout(pdfTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!inspectedDish) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInspectedDish(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [inspectedDish]);

  const handleCategoryClick = (id: string) => {
    setActiveCategoryId(id);
    const el = document.getElementById(`menu-cat-${id}`);
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  const handlePdfDownloadPlaceholder = () => {
    setPdfNotice(true);
    if (pdfTimerRef.current !== null) {
      window.clearTimeout(pdfTimerRef.current);
    }
    pdfTimerRef.current = window.setTimeout(() => {
      setPdfNotice(false);
    }, 3400);
  };

  const filteredCategories = useMemo(() => {
    return menuData.categories.map((category) => ({
      ...category,
      items:
        activeFilter === 'all'
          ? category.items
          : category.items.filter((item) => item.tags.includes(activeFilter)),
    }));
  }, [activeFilter]);

  return (
    <div className="relative pt-24 pb-20 sm:pt-32 lg:pt-36 sm:pb-28">
      {/* Hero Strip */}
      <header className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 pb-10 sm:pb-16">
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
            {menuData.subtitle} · {menuData.status}
          </p>

          <h1 className="font-display font-light text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.06] tracking-[0.06em] text-[#F3E9DC] mb-5 sm:mb-6">
            The Menu
          </h1>

          {/* Thin Gold Line Drawing In */}
          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 1.05, delay: 0.18, ease: SHOJI_EASE }
            }
            className="h-px w-full max-w-md bg-[#C9A15A]/65 origin-left mb-5 sm:mb-6"
          />

          <p className="font-body text-sm sm:text-[15px] font-light leading-relaxed text-[#F3E9DC]/75 max-w-xl">
            {menuData.notice}
          </p>
        </motion.div>

        {/* Minimal Dietary Filter Bar + Download PDF Menu Placeholder */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#C9A15A]/18 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5">
          {/* Dietary Filter Buttons */}
          <div
            role="group"
            aria-label="Filter menu by dietary preference"
            className="flex flex-wrap items-center gap-2"
          >
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative px-4 py-2 min-h-[44px] sm:min-h-[40px] border text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 ${
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

          {/* Download PDF Menu Placeholder */}
          <div className="relative flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handlePdfDownloadPlaceholder}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 min-h-[44px] sm:min-h-[40px] border border-[#C9A15A]/55 text-[11px] font-light tracking-[0.22em] uppercase text-[#C9A15A] hover:bg-[#C9A15A] hover:text-[#2B0A10] transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={1.3} aria-hidden="true" />
              <span>{menuData.downloadLabel}</span>
            </button>

            {pdfNotice && (
              <span
                role="status"
                className="text-[11px] font-light tracking-[0.06em] text-[#C9A15A]"
              >
                PDF menu will be released upon opening.
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sticky Horizontal Category Bar (Scroll Snap) */}
      <nav
        aria-label="Menu categories"
        className="lg:hidden sticky top-[var(--luno-header-h,56px)] transition-[top] duration-300 z-20 bg-[#2B0A10]/94 backdrop-blur-md border-y border-[#C9A15A]/22 mb-8 sm:mb-10"
      >
        <div className="flex items-center gap-1 overflow-x-auto snap-x snap-mandatory px-3 py-1.5 no-scrollbar">
          {allNavCategories.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`relative snap-start px-3 py-2 min-h-[40px] text-[10px] tracking-[0.2em] uppercase whitespace-nowrap shrink-0 transition-colors ${
                  isActive ? 'text-[#C9A15A]' : 'text-[#F3E9DC]/65'
                }`}
              >
                <span>{cat.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="mobile-menu-cat-underline"
                    transition={{ duration: 0.35, ease: SHOJI_EASE }}
                    className="absolute bottom-1 inset-x-3.5 h-px bg-[#C9A15A]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Two-Column Printed Kaiseki Layout */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Desktop Left Sticky Vertical Category List */}
          <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-28">
            <p className="font-body text-[10px] font-light tracking-[0.32em] uppercase text-[#C9A15A]/75 mb-5">
              Chapters
            </p>
            <nav aria-label="Menu categories" className="relative pl-4 border-l border-[#C9A15A]/18">
              <ul className="space-y-2.5">
                {allNavCategories.map((cat) => {
                  const isActive = activeCategoryId === cat.id;
                  return (
                    <li key={cat.id} className="relative">
                      {isActive && (
                        <motion.span
                          layoutId="desktop-menu-cat-indicator"
                          transition={{ duration: 0.4, ease: SHOJI_EASE }}
                          aria-hidden="true"
                          className="absolute -left-[17px] top-1.5 bottom-1.5 w-[2px] bg-[#C9A15A]"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`text-left py-1.5 font-display text-lg font-light tracking-[0.04em] transition-colors duration-200 ${
                          isActive
                            ? 'text-[#C9A15A]'
                            : 'text-[#F3E9DC]/65 hover:text-[#F3E9DC]'
                        }`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Right Kaiseki Menu Categories & Tasting Menu */}
          <div className="lg:col-span-9 space-y-20 sm:space-y-24">
            {filteredCategories.map((category) => (
              <section
                key={category.id}
                id={`menu-cat-${category.id}`}
                aria-labelledby={`cat-heading-${category.id}`}
                className="scroll-mt-32"
              >
                {/* Ink-Wipe Category Title Header */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0.2, x: -8, clipPath: 'inset(0 100% 0 0)' }
                  }
                  whileInView={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }
                  }
                  viewport={{ once: true, amount: 0.25 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.2 }
                      : { duration: 0.9, ease: SHOJI_EASE }
                  }
                  className="pb-5 border-b border-[#C9A15A]/28 mb-2"
                >
                  {category.subtitle && (
                    <p className="font-jp text-[11px] font-light tracking-[0.28em] text-[#C9A15A] mb-2">
                      {category.subtitle}
                    </p>
                  )}
                  <h2
                    id={`cat-heading-${category.id}`}
                    className="font-display font-light text-3xl sm:text-4xl tracking-[0.04em] text-[#F3E9DC]"
                  >
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="mt-2 font-body text-xs sm:text-sm font-light text-[#F3E9DC]/65">
                      {category.description}
                    </p>
                  )}
                </motion.div>

                {/* Category Items */}
                <AnimatePresence mode="popLayout">
                  {category.items.length > 0 ? (
                    <motion.ul layout={!prefersReducedMotion}>
                      {category.items.map((item, idx) => (
                        <MenuItemRow
                          key={item.id}
                          item={item}
                          index={idx}
                          onInspectImage={setInspectedDish}
                        />
                      ))}
                    </motion.ul>
                  ) : (
                    <motion.p
                      key="empty-filter"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-6 font-body text-xs font-light tracking-[0.12em] text-[#F3E9DC]/50"
                    >
                      No items match the selected dietary filter in this chapter.
                    </motion.p>
                  )}
                </AnimatePresence>
              </section>
            ))}

            {/* Dedicated Tasting Menu / Omakase Block Framed in Gold with Corner Ornaments */}
            <section
              id={`menu-cat-${menuData.tastingMenu.id}`}
              aria-labelledby="tasting-menu-heading"
              className="scroll-mt-32 relative border border-[#C9A15A]/45 bg-[#4A121C]/22 px-4 py-8 sm:px-12 sm:py-14"
            >
              {/* Gold Corner Ornaments */}
              <span
                aria-hidden="true"
                className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#C9A15A]"
              />
              <span
                aria-hidden="true"
                className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#C9A15A]"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#C9A15A]"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#C9A15A]"
              />

              <motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0.2, x: -8, clipPath: 'inset(0 100% 0 0)' }
                }
                whileInView={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.2 }
                    : { duration: 0.9, ease: SHOJI_EASE }
                }
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#C9A15A]/28"
              >
                <div>
                  <p className="font-jp text-[11px] font-light tracking-[0.28em] text-[#C9A15A] mb-2">
                    {menuData.tastingMenu.subtitle}
                  </p>
                  <h2
                    id="tasting-menu-heading"
                    className="font-display font-light text-3xl sm:text-4xl tracking-[0.04em] text-[#F3E9DC]"
                  >
                    {menuData.tastingMenu.name}
                  </h2>
                  <p className="mt-2 font-body text-xs sm:text-sm font-light text-[#F3E9DC]/70 max-w-xl">
                    {menuData.tastingMenu.description}
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="block font-body text-[10px] tracking-[0.26em] uppercase text-[#C9A15A]/80 mb-1">
                    Per Guest
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-light tracking-[0.08em] tabular-nums text-[#C9A15A]">
                    {formatQarPrice(menuData.tastingMenu.pricePerGuest)}
                  </span>
                </div>
              </motion.div>

              {/* Course-by-Course Progression */}
              <ol className="divide-y divide-[#C9A15A]/15 my-6">
                {menuData.tastingMenu.courses.map((course, idx) => (
                  <motion.li
                    key={course.id}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 12 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.15 }
                        : {
                            duration: 0.6,
                            delay: idx * 0.06,
                            ease: SHOJI_EASE,
                          }
                    }
                    className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                  >
                    <span className="sm:col-span-3 font-body text-[11px] font-light tracking-[0.26em] uppercase text-[#C9A15A]">
                      {course.course}
                    </span>
                    <div className="sm:col-span-9 space-y-1">
                      <h3 className="font-display text-xl sm:text-2xl font-light text-[#F3E9DC]">
                        {course.name}
                      </h3>
                      <p className="font-body text-xs sm:text-sm font-light text-[#F3E9DC]/70">
                        {course.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>

              <div className="pt-6 border-t border-[#C9A15A]/22 flex justify-start sm:justify-end">
                <Link
                  to={menuData.tastingMenu.ctaTo}
                  className="group relative overflow-hidden inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 min-h-[46px] border border-[#C9A15A] text-xs font-normal tracking-[0.24em] uppercase text-[#C9A15A] whitespace-nowrap transition-colors duration-300"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#C9A15A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <span className="relative z-10 group-hover:text-[#2B0A10] transition-colors duration-200">
                    {menuData.tastingMenu.ctaLabel}
                  </span>
                </Link>
              </div>
            </section>

            {/* Dietary & Allergen Legend + Footer Notices */}
            <footer className="border-t border-[#C9A15A]/22 pt-10 space-y-6">
              <div>
                <h3 className="font-body text-[10px] font-light tracking-[0.32em] uppercase text-[#C9A15A] mb-4">
                  Dietary & Allergen Guide
                </h3>
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {menuData.dietaryLegend.map((entry) => (
                    <li
                      key={entry.id}
                      className="inline-flex items-center gap-2 text-xs font-light text-[#F3E9DC]/78"
                    >
                      <DietaryIcon tag={entry.id as DietaryTag} />
                      <span>{entry.label}</span>
                    </li>
                  ))}
                  <li className="inline-flex items-center gap-2 text-xs font-light text-[#F3E9DC]/78">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-[#C9A15A]"
                    >
                      <path
                        d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>Signature</span>
                  </li>
                  <li className="inline-flex items-center gap-2 text-xs font-light text-[#F3E9DC]/78">
                    <span className="px-1 py-0.5 rounded-[2px] bg-[#B3262E] text-[8px] tracking-[0.16em] uppercase text-[#F3E9DC] leading-none">
                      NEW
                    </span>
                    <span>New Addition</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 text-xs font-light text-[#F3E9DC]/60 leading-relaxed">
                <p>{menuData.allergenNotice}</p>
                <p>{menuData.pricingNote}</p>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Animated Dish Detail Spotlight Modal (when tapping/clicking a dish image) */}
      <AnimatePresence>
        {inspectedDish && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={inspectedDish.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setInspectedDish(null)}
            className="fixed inset-0 z-50 bg-[#1B0509]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-5"
          >
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 12 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 8 }
              }
              transition={{ duration: 0.35, ease: SHOJI_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[88dvh] overflow-y-auto bg-[#2B0A10] border border-[#C9A15A]/45 p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-8 shadow-[0_32px_80px_rgba(0,0,0,0.65)]"
            >
              <button
                type="button"
                onClick={() => setInspectedDish(null)}
                aria-label="Close dish preview"
                className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-11 h-11 bg-[#2B0A10]/85 border border-[#C9A15A]/30 sm:border-transparent text-[#C9A15A] hover:text-[#F3E9DC] transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.3} aria-hidden="true" />
              </button>

              {inspectedDish.image && (
                <div className="sm:col-span-5 aspect-[3/4] max-h-[38dvh] sm:max-h-none w-auto sm:w-full mx-auto rounded-none border border-[#C9A15A]/40 bg-[#370D14] overflow-hidden">
                  <img
                    src={inspectedDish.image}
                    alt={inspectedDish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover block"
                  />
                </div>
              )}

              <div className="sm:col-span-7 flex flex-col justify-between space-y-5 sm:pr-4">
                <div className="space-y-3">
                  <span className="block font-display text-xl tracking-[0.08em] tabular-nums text-[#C9A15A]">
                    {formatQarPrice(inspectedDish.price)}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-[#F3E9DC]">
                    {inspectedDish.name}
                  </h3>
                  <p className="font-body text-sm font-light leading-relaxed text-[#F3E9DC]/78">
                    {inspectedDish.description}
                  </p>
                </div>

                {inspectedDish.ingredients && inspectedDish.ingredients.length > 0 && (
                  <div className="pt-4 border-t border-[#C9A15A]/20">
                    <p className="font-body text-[10px] tracking-[0.28em] uppercase text-[#C9A15A] mb-2">
                      Ingredients
                    </p>
                    <p className="font-body text-xs font-light leading-relaxed text-[#F3E9DC]/75">
                      {inspectedDish.ingredients.join(' · ')}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
