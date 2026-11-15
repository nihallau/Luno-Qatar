import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { siteData } from '../../../data/site.js';

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-4 h-4"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-4 h-4"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function SiteFooter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setName('');
    setEmail('');
  };

  return (
    <footer className="relative w-full bg-[#24070D]/90 border-t border-[#C9A15A]/22 pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
      {/* Thin Gold Seigaiha Strip at the Top Edge */}
      <div
        aria-hidden="true"
        className="w-full h-5 overflow-hidden border-b border-[#C9A15A]/15 text-[#C9A15A] opacity-[0.22]"
      >
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="footer-seigaiha-strip"
              width="40"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <g fill="none" stroke="currentColor" strokeWidth="0.75">
                <circle cx="20" cy="20" r="18" />
                <circle cx="20" cy="20" r="13" />
                <circle cx="20" cy="20" r="8" />
                <circle cx="0" cy="10" r="18" />
                <circle cx="0" cy="10" r="13" />
                <circle cx="0" cy="10" r="8" />
                <circle cx="40" cy="10" r="18" />
                <circle cx="40" cy="10" r="13" />
                <circle cx="40" cy="10" r="8" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-seigaiha-strip)" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14 pt-14 pb-10">
        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#C9A15A]/18">
          {/* Column 1: LUNO Wordmark & Tagline */}
          <div className="lg:col-span-3 space-y-4">
            <Link
              to="/"
              className="inline-block font-display text-3xl font-light tracking-[0.24em] text-[#F3E9DC] hover:text-[#C9A15A] transition-colors"
            >
              {siteData.brand.name}
            </Link>
            <p className="font-display italic text-lg font-light tracking-[0.06em] text-[#F3E9DC]/85">
              {siteData.brand.tagline}
            </p>
            <p className="font-body text-[11px] font-light tracking-[0.32em] uppercase text-[#C9A15A]">
              {siteData.brand.status}
            </p>
          </div>

          {/* Column 2: Explore Links */}
          <div className="lg:col-span-3">
            <h3 className="font-body text-[11px] font-light tracking-[0.32em] uppercase text-[#C9A15A] mb-5">
              Explore
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 sm:gap-y-2.5 text-[13px] font-light tracking-[0.04em] text-[#F3E9DC]/78">
              {siteData.navigation.explore.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex items-center min-h-[40px] sm:min-h-0 py-1 sm:py-0.5 hover:text-[#C9A15A] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Visit — Address, Hours, Tap-to-Call Phone Numbers */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-body text-[11px] font-light tracking-[0.32em] uppercase text-[#C9A15A] mb-5">
              Visit
            </h3>

            <a
              href={siteData.location.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-[13px] font-light leading-relaxed text-[#F3E9DC]/85 hover:text-[#C9A15A] transition-colors"
            >
              <MapPin
                className="w-4 h-4 mt-0.5 shrink-0 text-[#C9A15A]"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <span>{siteData.location.address}</span>
            </a>

            <p className="text-[12px] font-light tracking-[0.08em] text-[#F3E9DC]/60 pl-6">
              {siteData.location.hoursLabel}
            </p>

            <ul className="space-y-1 pt-1">
              {siteData.contact.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    aria-label={phone.label}
                    className="inline-flex items-center gap-2.5 min-h-[44px] sm:min-h-0 py-1.5 sm:py-1 text-[14px] font-light tracking-[0.12em] tabular-nums text-[#F3E9DC]/85 hover:text-[#C9A15A] transition-colors"
                  >
                    <Phone
                      className="w-3.5 h-3.5 shrink-0 text-[#C9A15A]"
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                    <span>{phone.display}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Signup & Social Icons */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <h3 className="font-body text-[11px] font-light tracking-[0.32em] uppercase text-[#C9A15A] mb-3">
                {siteData.newsletter.heading}
              </h3>
              <p className="text-[12px] font-light leading-relaxed text-[#F3E9DC]/70 mb-4">
                {siteData.newsletter.description}
              </p>

              <form onSubmit={handleSubscribe} noValidate className="space-y-2.5">
                <div>
                  <label htmlFor="footer-newsletter-name" className="sr-only">
                    Name (optional)
                  </label>
                  <input
                    id="footer-newsletter-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={siteData.newsletter.namePlaceholder}
                    className="w-full px-3 py-2.5 sm:py-2 min-h-[44px] sm:min-h-0 bg-[#2B0A10]/70 border border-[#C9A15A]/25 text-base sm:text-xs font-light text-[#F3E9DC] placeholder:text-[#F3E9DC]/40 focus:border-[#C9A15A] focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder={siteData.newsletter.emailPlaceholder}
                    className="flex-1 min-w-0 px-3 py-2.5 sm:py-2 min-h-[44px] sm:min-h-0 bg-[#2B0A10]/70 border border-[#C9A15A]/25 text-base sm:text-xs font-light text-[#F3E9DC] placeholder:text-[#F3E9DC]/40 focus:border-[#C9A15A] focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 sm:py-2 min-h-[44px] sm:min-h-[38px] border border-[#C9A15A]/60 text-[11px] sm:text-[10px] font-normal tracking-[0.24em] uppercase text-[#C9A15A] hover:bg-[#C9A15A] hover:text-[#2B0A10] transition-colors whitespace-nowrap shrink-0"
                  >
                    {siteData.newsletter.submitLabel}
                  </button>
                </div>

                {status === 'error' && (
                  <p role="alert" className="text-[11px] text-[#E88B8F]">
                    {siteData.newsletter.errorMessage}
                  </p>
                )}
                {status === 'success' && (
                  <p role="status" className="text-[11px] text-[#C9A15A]">
                    {siteData.newsletter.successMessage}
                  </p>
                )}
              </form>
            </div>

            {/* Social Links (Instagram & TikTok) */}
            <div className="flex items-center gap-3 pt-1">
              {siteData.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex items-center justify-center w-10 h-10 border border-[#C9A15A]/28 text-[#C9A15A]/80 hover:border-[#C9A15A] hover:text-[#F3E9DC] transition-colors"
                >
                  {social.id === 'instagram' ? (
                    <InstagramIcon />
                  ) : (
                    <TikTokIcon />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Credit Row */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-light tracking-[0.16em] text-[#F3E9DC]/55">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2">
            <span>{siteData.brand.copyright}</span>
            {siteData.navigation.legal.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:text-[#C9A15A] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <span>{siteData.brand.credit}</span>
        </div>
      </div>
    </footer>
  );
}
