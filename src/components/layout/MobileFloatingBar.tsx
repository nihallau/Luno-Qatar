import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, Phone } from 'lucide-react';
import { siteData } from '../../../data/site.js';

interface MobileFloatingBarProps {
  hidden: boolean;
}

export function MobileFloatingBar({ hidden }: MobileFloatingBarProps) {
  const primaryPhone = siteData.contact.phones[0];
  const mobilePhone = siteData.contact.phones[1];

  return (
    <div
      aria-hidden={hidden}
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#2B0A10]/94 backdrop-blur-md border-t border-[#C9A15A]/30 pb-[env(safe-area-inset-bottom)] transition-all duration-300 ${
        hidden
          ? 'opacity-0 translate-y-full pointer-events-none'
          : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="grid grid-cols-3 divide-x divide-[#C9A15A]/22 h-12">
        <a
          href={primaryPhone.href}
          tabIndex={hidden ? -1 : undefined}
          className="flex items-center justify-center gap-2 text-[11px] font-light tracking-[0.18em] uppercase text-[#F3E9DC] hover:text-[#C9A15A] transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#C9A15A]" strokeWidth={1.3} aria-hidden="true" />
          <span>Call</span>
        </a>

        <a
          href={mobilePhone.whatsappHref ?? mobilePhone.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={hidden ? -1 : undefined}
          className="flex items-center justify-center gap-2 text-[11px] font-light tracking-[0.18em] uppercase text-[#F3E9DC] hover:text-[#C9A15A] transition-colors"
        >
          <MessageCircle
            className="w-3.5 h-3.5 text-[#C9A15A]"
            strokeWidth={1.3}
            aria-hidden="true"
          />
          <span>WhatsApp</span>
        </a>

        <Link
          to={siteData.navigation.reserveCta.to}
          tabIndex={hidden ? -1 : undefined}
          className="flex items-center justify-center gap-2 text-[11px] font-normal tracking-[0.2em] uppercase text-[#C9A15A] hover:bg-[#C9A15A]/12 transition-colors"
        >
          <Calendar
            className="w-3.5 h-3.5 text-[#C9A15A]"
            strokeWidth={1.3}
            aria-hidden="true"
          />
          <span>Reserve</span>
        </Link>
      </div>
    </div>
  );
}
