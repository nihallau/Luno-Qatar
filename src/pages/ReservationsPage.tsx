import React, { useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { siteData } from '../../data/site.js';
import { PreparedPage } from './PreparedPage';

export function ReservationsPage() {
  const meta = siteData.pages.reservations;
  const mobilePhone = siteData.contact.phones[1];
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [formState, setFormState] = useState<'idle' | 'error' | 'submitted'>('idle');

  const handleNotifySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail.trim());
    if (!validEmail) {
      setFormState('error');
      return;
    }
    setFormState('submitted');
    setGuestName('');
    setGuestEmail('');
  };

  return (
    <PreparedPage
      eyebrow={meta.eyebrow}
      title={meta.title}
      summary={meta.summary}
      statusNote={meta.statusNote}
    >
      <div className="border-t border-[#C9A15A]/20 pt-8 space-y-8">
        {/* Direct Telephone & WhatsApp Actions */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          {siteData.contact.phones.map((phone) => (
            <a
              key={phone.href}
              href={phone.href}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 min-h-[46px] border border-[#C9A15A]/55 text-xs tracking-[0.2em] uppercase text-[#F3E9DC] hover:border-[#C9A15A] hover:bg-[#C9A15A]/12 transition-colors whitespace-nowrap"
            >
              <Phone
                className="w-3.5 h-3.5 text-[#C9A15A]"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <span className="tabular-nums">{phone.display}</span>
            </a>
          ))}

          {mobilePhone?.whatsappHref && (
            <a
              href={mobilePhone.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 min-h-[46px] border border-[#C9A15A]/55 text-xs tracking-[0.2em] uppercase text-[#C9A15A] hover:bg-[#C9A15A] hover:text-[#2B0A10] transition-colors whitespace-nowrap"
            >
              <MessageCircle
                className="w-3.5 h-3.5"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <span>WhatsApp Concierge</span>
            </a>
          )}
        </div>

        {/* Opening Table Priority Notification Form */}
        <div className="border border-[#C9A15A]/20 bg-[#4A121C]/20 p-5 sm:p-8 max-w-xl">
          <h2 className="font-display text-2xl font-light text-[#F3E9DC] mb-2">
            Opening Reservations Alert
          </h2>
          <p className="font-body text-xs font-light leading-relaxed text-[#F3E9DC]/70 mb-5">
            Leave your contact details to be notified as soon as our booking
            ledger opens.
          </p>

          <form onSubmit={handleNotifySubmit} noValidate className="space-y-3">
            <div>
              <label htmlFor="res-guest-name" className="sr-only">
                Full Name (optional)
              </label>
              <input
                id="res-guest-name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Name (optional)"
                className="w-full px-3.5 py-2.5 min-h-[46px] bg-[#2B0A10]/75 border border-[#C9A15A]/25 text-base sm:text-sm font-light text-[#F3E9DC] placeholder:text-[#F3E9DC]/40 focus:border-[#C9A15A] focus:outline-none"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="res-guest-email" className="sr-only">
                Email address
              </label>
              <input
                id="res-guest-email"
                type="email"
                required
                value={guestEmail}
                onChange={(e) => {
                  setGuestEmail(e.target.value);
                  if (formState === 'error') setFormState('idle');
                }}
                placeholder="Email address"
                className="flex-1 px-3.5 py-2.5 min-h-[46px] bg-[#2B0A10]/75 border border-[#C9A15A]/25 text-base sm:text-sm font-light text-[#F3E9DC] placeholder:text-[#F3E9DC]/40 focus:border-[#C9A15A] focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 min-h-[46px] border border-[#C9A15A] bg-[#C9A15A]/15 text-xs font-normal tracking-[0.24em] uppercase text-[#F3E9DC] hover:bg-[#C9A15A] hover:text-[#2B0A10] transition-colors whitespace-nowrap"
              >
                Notify Me
              </button>
            </div>
            {formState === 'error' && (
              <p role="alert" className="text-xs text-[#E88B8F]">
                {siteData.newsletter.errorMessage}
              </p>
            )}
            {formState === 'submitted' && (
              <p role="status" className="text-xs text-[#C9A15A]">
                {siteData.newsletter.successMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </PreparedPage>
  );
}
