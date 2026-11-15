import React from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../../data/site.js';
import { CrescentMoon } from '../components/motifs/JapaneseMotifs';

export function NotFoundPage() {
  const meta = siteData.pages.notFound;

  return (
    <section className="min-h-[80dvh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-lg w-full border border-[#C9A15A]/24 bg-[#2B0A10]/65 px-6 py-10 sm:px-8 sm:py-14 text-center space-y-6">
        <div className="flex justify-center">
          <CrescentMoon className="w-10 h-10 text-[#C9A15A]" />
        </div>
        <p className="font-body text-[11px] font-light tracking-[0.36em] uppercase text-[#C9A15A]">
          {meta.eyebrow}
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-light text-[#F3E9DC]">
          {meta.title}
        </h1>
        <p className="font-body text-sm font-light leading-relaxed text-[#F3E9DC]/75">
          {meta.summary}
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 min-h-[46px] border border-[#C9A15A]/60 text-xs tracking-[0.24em] uppercase text-[#F3E9DC] hover:bg-[#C9A15A] hover:text-[#2B0A10] transition-colors whitespace-nowrap"
          >
            {meta.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
