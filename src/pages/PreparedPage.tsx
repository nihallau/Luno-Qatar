import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Phone } from 'lucide-react';
import { siteData } from '../../data/site.js';
import { CrescentMoon, EnsoCircle } from '../components/motifs/JapaneseMotifs';

const SHOJI_EASE = [0.16, 1, 0.3, 1] as const;

interface PreparedPageProps {
  eyebrow: string;
  title: string;
  summary: string;
  statusNote: string;
  children?: React.ReactNode;
}

export function PreparedPage({
  eyebrow,
  title,
  summary,
  statusNote,
  children,
}: PreparedPageProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-24 pb-16 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { duration: 0.75, ease: SHOJI_EASE }
          }
          className="relative border border-[#C9A15A]/24 bg-[#2B0A10]/65 backdrop-blur-[2px] px-5 py-8 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8 space-y-5 sm:space-y-6">
              <p className="font-body text-[11px] font-light tracking-[0.34em] uppercase text-[#C9A15A]">
                {eyebrow}
              </p>

              <h1 className="font-display font-light text-[clamp(2.15rem,4.5vw,3.75rem)] leading-[1.1] tracking-[0.04em] text-[#F3E9DC] text-balance">
                {title}
              </h1>

              <div className="w-16 h-px bg-[#C9A15A]/45" aria-hidden="true" />

              <p className="font-body text-sm sm:text-base font-light leading-[1.85] text-[#F3E9DC]/80 max-w-2xl">
                {summary}
              </p>

              <p className="font-body text-xs font-light tracking-[0.26em] uppercase text-[#C9A15A]/90 pt-2">
                {statusNote}
              </p>

              {children && <div className="pt-4 sm:pt-6">{children}</div>}
            </div>

            <aside className="lg:col-span-4 pt-8 border-t border-[#C9A15A]/20 lg:pt-0 lg:border-t-0 lg:pl-10 lg:border-l flex flex-col justify-between gap-7 sm:gap-8">
              <div className="relative flex items-center justify-center py-2 sm:py-4">
                <EnsoCircle className="w-28 h-28 sm:w-36 sm:h-36 text-[#C9A15A]/40" />
                <CrescentMoon className="absolute w-7 h-7 sm:w-9 sm:h-9 text-[#C9A15A]" />
              </div>

              <div className="space-y-3 border-t border-[#C9A15A]/18 pt-6">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#C9A15A]">
                  Direct Concierge
                </p>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  {siteData.contact.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="inline-flex items-center gap-2.5 min-h-[44px] font-display text-xl tracking-[0.12em] tabular-nums text-[#F3E9DC] hover:text-[#C9A15A] transition-colors"
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

              <Link
                to="/"
                className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 min-h-[44px] border border-[#C9A15A]/40 text-[11px] tracking-[0.24em] uppercase text-[#F3E9DC] hover:border-[#C9A15A] hover:text-[#C9A15A] transition-colors whitespace-nowrap"
              >
                Return Home
              </Link>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
