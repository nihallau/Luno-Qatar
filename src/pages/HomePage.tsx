import React from 'react';
import { useReducedMotion } from 'motion/react';
import { HeroSection } from '../components/hero/HeroSection';
import { MenuTeaserSection } from '../components/home/MenuTeaserSection';
import { AtmosphereSection } from '../components/home/AtmosphereSection';
import { ReservationCtaSection } from '../components/home/ReservationCtaSection';

interface HomePageProps {
  isRevealed: boolean;
}

export function HomePage({ isRevealed }: HomePageProps) {
  const prefersReducedMotion = useReducedMotion();

  const scrollToMenuTeaser = () => {
    const el = document.getElementById('menu-teaser');
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <HeroSection
        isRevealed={isRevealed}
        onScrollCueClick={scrollToMenuTeaser}
      />
      <MenuTeaserSection />
      <AtmosphereSection />
      <ReservationCtaSection />
    </>
  );
}
