import React from 'react';
import { ArrowUpRight, Clock, MapPin, MessageCircle } from 'lucide-react';
import { siteData } from '../../data/site.js';
import { PreparedPage } from './PreparedPage';

interface VisitContactPageProps {
  eyebrow: string;
  title: string;
  summary: string;
}

export function VisitContactPage({
  eyebrow,
  title,
  summary,
}: VisitContactPageProps) {
  const mobilePhone = siteData.contact.phones[1];

  return (
    <PreparedPage
      eyebrow={eyebrow}
      title={title}
      summary={summary}
      statusNote={siteData.location.hoursLabel}
    >
      <div className="border-t border-[#C9A15A]/20 pt-6 space-y-5">
        <a
          href={siteData.location.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-3 py-2 min-h-[44px] text-[#F3E9DC] hover:text-[#C9A15A] transition-colors"
        >
          <MapPin
            className="w-4 h-4 mt-1 shrink-0 text-[#C9A15A]"
            strokeWidth={1.25}
            aria-hidden="true"
          />
          <span className="font-display text-lg sm:text-2xl font-light border-b border-transparent group-hover:border-[#C9A15A]/50 transition-colors leading-snug">
            {siteData.location.address}
          </span>
          <ArrowUpRight
            className="w-4 h-4 mt-1 shrink-0 text-[#C9A15A]/70 group-hover:text-[#C9A15A]"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </a>

        <div className="flex items-center gap-3 text-[#F3E9DC]/72">
          <Clock
            className="w-4 h-4 shrink-0 text-[#C9A15A]/80"
            strokeWidth={1.25}
            aria-hidden="true"
          />
          <span className="font-body text-xs tracking-[0.2em] uppercase">
            {siteData.location.hoursLabel}
          </span>
        </div>

        {mobilePhone?.whatsappHref && (
          <div className="pt-2">
            <a
              href={mobilePhone.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2.5 px-5 py-3 min-h-[46px] border border-[#C9A15A]/50 text-xs tracking-[0.22em] uppercase text-[#C9A15A] hover:bg-[#C9A15A] hover:text-[#2B0A10] transition-colors whitespace-nowrap"
            >
              <MessageCircle
                className="w-3.5 h-3.5"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <span>WhatsApp ({mobilePhone.display})</span>
            </a>
          </div>
        )}
      </div>
    </PreparedPage>
  );
}
