import { siteData } from '../../data/site.js';

export interface PhoneContact {
  display: string;
  href: string;
  label: string;
  whatsappHref?: string;
}

export const LUNO_BRAND = {
  name: siteData.brand.name,
  fullName: siteData.brand.fullName,
  tagline: siteData.brand.tagline,
  status: siteData.brand.status,
  address: siteData.location.address,
  shortLocation: siteData.location.shortLabel,
  mapsHref: siteData.location.mapsHref,
  verticalColumnText: siteData.brand.verticalColumnText,
  logoSrc: siteData.brand.logoSrc,
  logoAlt: siteData.brand.logoAlt,
  phones: siteData.contact.phones as readonly PhoneContact[],
} as const;
