import React from 'react';

export type DietaryTag =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'nuts'
  | 'shellfish'
  | 'dairy'
  | 'spicy';

const TAG_LABELS: Record<DietaryTag, string> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  'gluten-free': 'Gluten-Free',
  nuts: 'Contains Nuts',
  shellfish: 'Contains Shellfish',
  dairy: 'Contains Dairy',
  spicy: 'Spicy',
};

interface DietaryIconProps {
  tag: DietaryTag;
  className?: string;
}

/**
 * Thin-stroke gold line icons for dietary & allergen indicators.
 */
export function DietaryIcon({ tag, className = 'w-3.5 h-3.5' }: DietaryIconProps) {
  const label = TAG_LABELS[tag] ?? tag;

  return (
    <span
      title={label}
      aria-label={label}
      className={`inline-flex items-center justify-center text-[#C9A15A]/85 ${className}`}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="w-full h-full"
      >
        {tag === 'vegetarian' && (
          <>
            <path d="M16 4C9.5 4 5 8.5 5 15c6.5 0 11-4.5 11-11Z" />
            <path d="M5 15L11.5 8.5" />
          </>
        )}
        {tag === 'vegan' && (
          <>
            <path d="M5.5 6.5L10 15.5L14.5 6.5" />
            <path d="M10 3.5c1.5 0 2.5 1 2.5 2.2-1.3 0-2.5-.9-2.5-2.2Z" />
          </>
        )}
        {tag === 'gluten-free' && (
          <>
            <path d="M10 3.5v13" />
            <path d="M7.5 7.5L10 6l2.5 1.5" />
            <path d="M7.5 11.5L10 10l2.5 1.5" />
            <path d="M4 16L16 4" />
          </>
        )}
        {tag === 'nuts' && (
          <>
            <ellipse cx="10" cy="11" rx="4.5" ry="5.5" />
            <path d="M8.5 5.5C8.5 4 11.5 4 11.5 5.5" />
            <path d="M10 7.5v7" />
          </>
        )}
        {tag === 'shellfish' && (
          <>
            <path d="M4.5 13.5C4.5 8.5 7 5.5 10 5.5s5.5 3 5.5 8c-2 1-9 1-11 0Z" />
            <path d="M10 5.5v9" />
            <path d="M7 6.5l1.5 7.5" />
            <path d="M13 6.5l-1.5 7.5" />
          </>
        )}
        {tag === 'dairy' && (
          <>
            <path d="M7.5 3.5h5l1 3.5v9a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V7l1-3.5Z" />
            <path d="M6.5 10.5h7" />
          </>
        )}
        {tag === 'spicy' && (
          <>
            <path d="M10.5 3.5c2 2.2 3 4.4 3 6.7a3.5 3.5 0 1 1-7 0c0-1.6.7-3 1.8-4.2.1 1.4.8 2.2 1.7 2.5-.2-1.8.1-3.4.5-5Z" />
          </>
        )}
      </svg>
    </span>
  );
}
