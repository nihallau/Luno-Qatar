/**
 * LUNO Qatar — Central Editable Site Content
 * Update copy, navigation, contact details, and page preparations here.
 */

export const siteData = {
  brand: {
    name: 'LUNO',
    fullName: 'LUNO Qatar',
    tagline: 'Creating Timeless Memories',
    status: 'Coming Soon',
    verticalColumnText: 'LUNO · ポルトアラビア · 近日公開',
    logoSrc: '/assets/aistudio/image_030107c8.png',
    logoAlt: 'LUNO — Creating Timeless Memories official emblem',
    copyright: '© 2026 LUNO Qatar',
    credit: 'Designed with care',
  },

  location: {
    address: 'Porto Arabia, The Pearl, Qatar',
    shortLabel: 'Porto Arabia · The Pearl',
    hoursLabel: 'Opening Hours To Be Announced',
    mapsHref:
      'https://www.google.com/maps/search/?api=1&query=Porto+Arabia+The+Pearl+Qatar',
  },

  contact: {
    phones: [
      {
        display: '44425466',
        href: 'tel:+97444425466',
        label: 'Call LUNO Qatar on 44425466',
      },
      {
        display: '50954666',
        href: 'tel:+97450954666',
        label: 'Call LUNO Qatar on 50954666',
        whatsappHref: 'https://wa.me/97450954666',
      },
    ],
  },

  hero: {
    primaryCta: {
      label: 'Reserve a Table',
      to: '/reservations',
    },
    secondaryCta: {
      label: 'View Menu',
      to: '/menu',
    },
  },

  navigation: {
    primary: [
      { label: 'Menu', to: '/menu' },
      { label: 'Our Story', to: '/about' },
      { label: 'Private Dining', to: '/private-dining' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Visit Us', to: '/visit' },
    ],
    reserveCta: {
      label: 'RESERVE',
      to: '/reservations',
    },
    explore: [
      { label: 'Our Story', to: '/about' },
      { label: 'Menu', to: '/menu' },
      { label: 'Reservations', to: '/reservations' },
      { label: 'Private Dining & Events', to: '/private-dining' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Visit Us', to: '/visit' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Gift Cards', to: '/gift-cards' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
    legal: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },

  socials: [
    {
      id: 'instagram',
      label: 'LUNO Qatar on Instagram',
      handle: '@luno.qatar',
      href: 'https://instagram.com',
    },
    {
      id: 'tiktok',
      label: 'LUNO Qatar on TikTok',
      handle: '@luno.qatar',
      href: 'https://tiktok.com',
    },
  ],

  newsletter: {
    heading: 'Private Invitations',
    description:
      'Receive an invitation ahead of our opening at Porto Arabia, The Pearl.',
    namePlaceholder: 'Name (optional)',
    emailPlaceholder: 'Email address',
    submitLabel: 'Notify Me',
    successMessage:
      'Thank you. We will share opening updates with you quietly.',
    errorMessage: 'Please enter a valid email address.',
  },

  editorial: {
    eyebrow: 'Porto Arabia · The Pearl',
    headlineLine1: 'An Experience,',
    headlineLine2: 'Soon To Unfold.',
    paragraph:
      '[EDIT: concept text] Along the quiet waterfront of Porto Arabia at The Pearl, LUNO is preparing to welcome its first guests. Conceived as an intimate destination of understated elegance, the sanctuary brings thoughtful architecture and serene hospitality together. Here, every gathering is shaped around creating timeless memories.',
  },

  experiences: {
    eyebrow: 'Signature Experiences',
    heading: 'Three Quiet Chambers',
    cards: [
      {
        id: 'dining-room',
        index: '01',
        kanji: '間',
        title: 'The Dining Room',
        caption: '[EDIT: Intimate main sanctuary overlooking Porto Arabia]',
        to: '/about',
        ctaLabel: 'Explore Story',
      },
      {
        id: 'menu',
        index: '02',
        kanji: '味',
        title: 'Menu',
        caption: '[EDIT: Seasonal craft and deliberate culinary restraint]',
        to: '/menu',
        ctaLabel: 'View Menu',
      },
      {
        id: 'private-dining',
        index: '03',
        kanji: '雅',
        title: 'Private Dining',
        caption: '[EDIT: Enclosed salons for unhurried private gatherings]',
        to: '/private-dining',
        ctaLabel: 'Private Events',
      },
    ],
  },

  menuTeaser: {
    eyebrow: 'Menu Teaser',
    heading: 'A Glimpse Ahead',
    ctaLabel: 'Explore Full Menu',
    ctaTo: '/menu',
  },

  atmosphere: {
    eyebrow: 'Atmosphere',
    heading: 'Light, Shadow & Stillness',
    caption:
      '[EDIT: Gallery & ambient film band placeholder — Porto Arabia, The Pearl]',
    ctaLabel: 'Enter Gallery',
    ctaTo: '/gallery',
    frames: [
      { id: 'study-1', label: 'Study I', subtitle: 'Shoji & Warm Burgundy' },
      { id: 'study-2', label: 'Study II', subtitle: 'Waterfront Dusk' },
      { id: 'study-3', label: 'Study III', subtitle: 'Quiet Table Setting' },
    ],
  },

  gallerySection: {
    eyebrow: 'Visual Archive',
    heading: 'Inside The Sanctuary',
    subcopy:
      'Architectural textures, shoji light studies, and seasonal culinary compositions along Porto Arabia.',
    ctaLabel: 'Explore Full Gallery',
    ctaTo: '/gallery',
  },

  reservationBand: {
    eyebrow: 'Opening Season',
    heading: 'Reserve Your Evening',
    subcopy:
      'Advance opening inquiries and priority notifications for Porto Arabia, The Pearl.',
    ctaLabel: 'Reserve Your Evening',
    ctaTo: '/reservations',
  },

  communityStrip: {
    eyebrow: 'Journal & Social',
    heading: 'Follow The Unfolding',
    instagramCta: 'Follow on Instagram',
  },

  pages: {
    about: {
      eyebrow: 'Our Story',
      title: 'About LUNO Qatar',
      summary:
        'Rooted in quiet restraint and warm hospitality, LUNO is preparing to open its doors at Porto Arabia, The Pearl, Qatar.',
      statusNote: 'Full story and architectural notes arriving ahead of opening.',
    },
    menu: {
      eyebrow: 'Culinary Direction',
      title: 'Menu',
      summary:
        'Our seasonal selections are currently in preparation for our inaugural season at Porto Arabia.',
      statusNote: 'Menus will be unveiled shortly before opening.',
    },
    reservations: {
      eyebrow: 'Table Inquiries',
      title: 'Reservations',
      summary:
        'Online reservations will open soon. For advance inquiries or private introductions, please reach our concierge directly.',
      statusNote: 'Coming Soon · Porto Arabia, The Pearl, Qatar',
    },
    privateDining: {
      eyebrow: 'Gatherings',
      title: 'Private Dining & Events',
      summary:
        'Intimate spaces designed for unhurried celebrations and bespoke evenings are currently being prepared.',
      statusNote: 'Direct inquiries are welcomed by telephone or WhatsApp.',
    },
    gallery: {
      eyebrow: 'Atmosphere',
      title: 'Gallery',
      summary:
        'Visual studies of our interiors, light, and waterfront setting at Porto Arabia will be shared as we approach opening.',
      statusNote: 'Coming Soon',
    },
    visit: {
      eyebrow: 'The Pearl, Qatar',
      title: 'Visit Us',
      summary:
        'Located along the waterfront promenade of Porto Arabia, The Pearl, Qatar.',
      statusNote: 'Opening Hours To Be Announced',
    },
    faq: {
      eyebrow: 'Guest Information',
      title: 'Frequently Asked Questions',
      summary:
        'Essential guidance on reservations, arrival at Porto Arabia, and opening schedules will appear here soon.',
      statusNote: 'For immediate assistance, please contact our telephone lines.',
    },
    giftCards: {
      eyebrow: 'Gifting',
      title: 'Gift Cards',
      summary:
        'LUNO Gift Cards and bespoke dining invitations will become available upon our official opening.',
      statusNote: 'Coming Soon',
    },
    careers: {
      eyebrow: 'Join Our House',
      title: 'Careers',
      summary:
        'Opportunities to join the LUNO Qatar hospitality team at Porto Arabia will be announced ahead of our opening.',
      statusNote: 'Telephone inquiries welcomed.',
    },
    contact: {
      eyebrow: 'Concierge',
      title: 'Contact',
      summary:
        'Reach LUNO Qatar directly by telephone, WhatsApp, or visit our coordinates at Porto Arabia.',
      statusNote: 'Porto Arabia, The Pearl, Qatar',
    },
    privacy: {
      eyebrow: 'Legal',
      title: 'Privacy Policy',
      summary:
        'LUNO Qatar respects your privacy. Details shared through opening notifications are used solely to communicate launch updates.',
      statusNote: 'Updated for 2026 pre-opening.',
    },
    terms: {
      eyebrow: 'Legal',
      title: 'Terms of Use',
      summary:
        'This website presents pre-opening information for LUNO Qatar at Porto Arabia, The Pearl. Schedules and details remain subject to opening announcements.',
      statusNote: '© 2026 LUNO Qatar',
    },
    notFound: {
      eyebrow: '404',
      title: 'A Quiet Detour',
      summary:
        'The page you are looking for is not available or is still in preparation.',
      ctaLabel: 'Return to Sanctuary',
    },
  },
};
