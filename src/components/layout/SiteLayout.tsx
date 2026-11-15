import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { MobileFloatingBar } from './MobileFloatingBar';

const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.15 }
              : { duration: 0.45, ease: SHOJI_EASE }
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
