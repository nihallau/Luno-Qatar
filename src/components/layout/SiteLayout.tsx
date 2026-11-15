import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { MobileFloatingBar } from './MobileFloatingBar';
import { SHOJI_EASE } from '../motifs/ShojiReveal';

export function SiteLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  const handleOpenMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="min-h-dvh flex flex-col justify-between text-[#F3E9DC] relative">
      <SiteHeader
        mobileMenuOpen={mobileMenuOpen}
        onOpenMobileMenu={handleOpenMobileMenu}
        onCloseMobileMenu={handleCloseMobileMenu}
      />

      <main className="flex-1 flex flex-col">
        <motion.div
          key={pathname}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0.25, clipPath: 'inset(0 100% 0 0)' }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0.15 }
              : { duration: 0.72, ease: SHOJI_EASE }
          }
          className="flex-1 flex flex-col"
        >
          <Outlet />
        </motion.div>
      </main>

      <SiteFooter />
      <MobileFloatingBar hidden={mobileMenuOpen} />
    </div>
  );
}
