import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, Phone, X } from 'lucide-react';
import { siteData } from '../../../data/site.js';

const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;

interface SiteHeaderProps {
  mobileMenuOpen: boolean;
  onOpenMobileMenu: () => void;
  onCloseMobileMenu: () => void;
}

export function SiteHeader({
  mobileMenuOpen,
  onOpenMobileMenu,
  onCloseMobileMenu,
}: SiteHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');
  const [langNotice, setLangNotice] = useState(false);
  const lastScrollYRef = useRef(0);
  const noticeTimerRef = useRef<number | null>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    onCloseMobileMenu();
  }, [location.pathname, onCloseMobileMenu]);

  // Scroll listener: transparent -> blurred burgundy after 80px; hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 80);

      if (mobileMenuOpen) {
        setIsHidden(false);
        lastScrollYRef.current = currentY;
        return;
      }

      if (currentY <= 80) {
        setIsHidden(false);
      } else {
        const delta = currentY - lastScrollYRef.current;
        if (delta > 6) {
          setIsHidden(true);
        } else if (delta < -6) {
          setIsHidden(false);
        }
      }

      lastScrollYRef.current = currentY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Keep --luno-header-h synced so sticky category bars align seamlessly on mobile
  useEffect(() => {
    const visible = !isHidden || mobileMenuOpen;
    document.documentElement.style.setProperty(
      '--luno-header-h',
      visible ? '56px' : '0px'
    );
  }, [isHidden, mobileMenuOpen]);

  // Lock body scroll & handle Escape when mobile shoji menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen, onCloseMobileMenu]);

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current !== null) {
        window.clearTimeout(noticeTimerRef.current);
      }
    };
  }, []);

  const handleLanguageSwitch = (nextLang: 'EN' | 'AR') => {
    setLang(nextLang);
    if (nextLang === 'AR') {
      setLangNotice(true);
      if (noticeTimerRef.current !== null) {
        window.clearTimeout(noticeTimerRef.current);
      }
      noticeTimerRef.current = window.setTimeout(() => {
        setLangNotice(false);
      }, 2800);
    } else {
      setLangNotice(false);
    }
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: isHidden && !mobileMenuOpen ? '-100%' : '0%',
          opacity: isHidden && !mobileMenuOpen ? 0 : 1,
        }}
        transition={
          prefersReducedMotion
            ? { duration: 0.1 }
            : { duration: 0.32, ease: SHOJI_EASE }
        }
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#2B0A10]/85 backdrop-blur-md border-b border-[#C9A15A]/28'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 h-14 md:h-16 flex items-center justify-between gap-3 sm:gap-6 lg:gap-8">
          {/* Zone 1: Left Wordmark */}
          <Link
            to="/"
            className="font-display text-xl sm:text-[22px] tracking-[0.26em] font-normal text-[#F3E9DC] whitespace-nowrap shrink-0 hover:text-[#C9A15A] transition-colors duration-200"
          >
            {siteData.brand.name}
          </Link>

          {/* Zone 2: Primary Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 xl:gap-9 text-[11px] tracking-[0.22em] uppercase text-[#F3E9DC]/78"
          >
            {siteData.navigation.primary.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap shrink-0 py-1.5 border-b transition-colors duration-200 ${
                    isActive
                      ? 'text-[#C9A15A] border-[#C9A15A]'
                      : 'border-transparent hover:border-[#C9A15A]/55 hover:text-[#F3E9DC]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Language Toggle Placeholder + Gold-Outlined RESERVE Button (Brush-Sweep Hover) */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            {/* EN / AR Toggle Placeholder */}
            <div
              role="group"
              aria-label="Language selector"
              className="relative inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase"
            >
              <button
                type="button"
                aria-pressed={lang === 'EN'}
                onClick={() => handleLanguageSwitch('EN')}
                className={`px-1.5 py-1 transition-colors duration-150 whitespace-nowrap ${
                  lang === 'EN'
                    ? 'text-[#C9A15A]'
                    : 'text-[#F3E9DC]/55 hover:text-[#F3E9DC]'
                }`}
              >
                EN
              </button>
              <span className="text-[#C9A15A]/35" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                aria-pressed={lang === 'AR'}
                onClick={() => handleLanguageSwitch('AR')}
                className={`px-1.5 py-1 transition-colors duration-150 whitespace-nowrap ${
                  lang === 'AR'
                    ? 'text-[#C9A15A]'
                    : 'text-[#F3E9DC]/55 hover:text-[#F3E9DC]'
                }`}
              >
                AR
              </button>

              {langNotice && (
                <span
                  role="status"
                  className="absolute top-full right-0 mt-2 px-3 py-1.5 bg-[#2B0A10]/95 border border-[#C9A15A]/30 text-[10px] tracking-[0.18em] normal-case text-[#F3E9DC]/85 whitespace-nowrap shadow-lg"
                >
                  Arabic edition arriving soon
                </span>
              )}
            </div>

            {/* Gold-outlined RESERVE button with brush-sweep hover fill */}
            <Link
              to={siteData.navigation.reserveCta.to}
              className="group relative overflow-hidden inline-flex items-center justify-center px-5 py-2 min-h-[40px] border border-[#C9A15A]/75 text-[11px] font-normal tracking-[0.26em] uppercase text-[#F3E9DC] whitespace-nowrap shrink-0 transition-colors duration-300"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[#C9A15A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <span className="relative z-10 group-hover:text-[#2B0A10] transition-colors duration-200">
                {siteData.navigation.reserveCta.label}
              </span>
            </Link>
          </div>

          {/* Mobile / Tablet Compact Controls */}
          <div className="relative flex lg:hidden items-center gap-2 sm:gap-3 shrink-0">
            <div
              role="group"
              aria-label="Language selector"
              className="inline-flex items-center gap-1 text-[11px] tracking-[0.18em]"
            >
              <button
                type="button"
                aria-pressed={lang === 'EN'}
                onClick={() => handleLanguageSwitch('EN')}
                className={`min-h-[44px] min-w-[34px] px-1.5 transition-colors ${
                  lang === 'EN' ? 'text-[#C9A15A]' : 'text-[#F3E9DC]/55'
                }`}
              >
                EN
              </button>
              <span className="text-[#C9A15A]/35" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                aria-pressed={lang === 'AR'}
                onClick={() => handleLanguageSwitch('AR')}
                className={`min-h-[44px] min-w-[34px] px-1.5 transition-colors ${
                  lang === 'AR' ? 'text-[#C9A15A]' : 'text-[#F3E9DC]/55'
                }`}
              >
                AR
              </button>
            </div>

            {langNotice && (
              <span
                role="status"
                className="absolute top-full right-0 mt-2 px-3 py-1.5 bg-[#2B0A10]/95 border border-[#C9A15A]/35 text-[10px] tracking-[0.16em] text-[#F3E9DC]/90 whitespace-nowrap shadow-lg"
              >
                Arabic edition arriving soon
              </span>
            )}

            <button
              type="button"
              onClick={onOpenMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="luno-mobile-shoji-menu"
              aria-label="Open navigation menu"
              className="inline-flex items-center justify-center w-11 h-11 text-[#F3E9DC] hover:text-[#C9A15A] transition-colors"
            >
              <Menu className="w-5 h-5" strokeWidth={1.3} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Sliding Shoji Panel Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            id="luno-mobile-shoji-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-50 lg:hidden overflow-hidden"
          >
            {/* Left Shoji Panel */}
            <motion.div
              aria-hidden="true"
              initial={prefersReducedMotion ? { opacity: 0 } : { x: '-100%' }}
              animate={prefersReducedMotion ? { opacity: 1 } : { x: '0%' }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: '-100%' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : { duration: 0.55, ease: SHOJI_EASE }
              }
              className="absolute inset-y-0 left-0 w-1/2 bg-[#2B0A10] border-r border-[#C9A15A]/20"
            >
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(201,161,90,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,161,90,0.45) 1px, transparent 1px)',
                  backgroundSize: '120px 120px',
                }}
              />
            </motion.div>

            {/* Right Shoji Panel */}
            <motion.div
              aria-hidden="true"
              initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
              animate={prefersReducedMotion ? { opacity: 1 } : { x: '0%' }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : { duration: 0.55, ease: SHOJI_EASE }
              }
              className="absolute inset-y-0 right-0 w-1/2 bg-[#2B0A10] border-l border-[#C9A15A]/20"
            >
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'linear-gradient(to left, rgba(201,161,90,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,161,90,0.45) 1px, transparent 1px)',
                  backgroundSize: '120px 120px',
                }}
              />
            </motion.div>

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: prefersReducedMotion ? 0 : 0.18 }}
              className="relative z-10 h-full flex flex-col justify-between px-5 sm:px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-y-auto"
            >
              {/* Top Bar Inside Mobile Menu */}
              <div className="shrink-0 flex items-center justify-between pb-3 border-b border-[#C9A15A]/20">
                <Link
                  to="/"
                  onClick={onCloseMobileMenu}
                  className="font-display text-xl tracking-[0.26em] text-[#F3E9DC]"
                >
                  {siteData.brand.name}
                </Link>

                <button
                  type="button"
                  onClick={onCloseMobileMenu}
                  aria-label="Close navigation menu"
                  className="inline-flex items-center gap-2 min-h-[44px] min-w-[44px] px-3 justify-center text-xs tracking-[0.22em] uppercase text-[#C9A15A] hover:text-[#F3E9DC] transition-colors"
                >
                  <span>Close</span>
                  <X className="w-5 h-5" strokeWidth={1.3} aria-hidden="true" />
                </button>
              </div>

              {/* Staggered Large Serif Navigation Links */}
              <nav
                aria-label="Mobile primary navigation"
                className="py-5 sm:py-8 flex flex-col gap-1.5 sm:gap-3"
              >
                {[
                  ...siteData.navigation.primary,
                  {
                    label: 'Reservations',
                    to: siteData.navigation.reserveCta.to,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.to}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 14 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.15 }
                        : {
                            duration: 0.45,
                            delay: 0.22 + idx * 0.06,
                            ease: SHOJI_EASE,
                          }
                    }
                  >
                    <NavLink
                      to={item.to}
                      onClick={onCloseMobileMenu}
                      className={({ isActive }) =>
                        `flex items-center min-h-[48px] py-1.5 font-display text-2xl sm:text-4xl font-light tracking-[0.08em] transition-colors ${
                          isActive
                            ? 'text-[#C9A15A]'
                            : 'text-[#F3E9DC] hover:text-[#C9A15A]'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Phones & Address */}
              <div className="shrink-0 pt-6 border-t border-[#C9A15A]/20 space-y-4">
                <div>
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#C9A15A] mb-1.5">
                    Location
                  </p>
                  <a
                    href={siteData.location.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-lg font-light text-[#F3E9DC]/90 hover:text-[#C9A15A] transition-colors"
                  >
                    {siteData.location.address}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {siteData.contact.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="inline-flex items-center gap-2 min-h-[44px] font-display text-lg tracking-[0.12em] tabular-nums text-[#F3E9DC] hover:text-[#C9A15A] transition-colors"
                    >
                      <Phone
                        className="w-3.5 h-3.5 text-[#C9A15A]"
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                      <span>{phone.display}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
