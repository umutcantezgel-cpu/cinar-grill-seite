/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          'primary-hover': 'var(--color-brand-primary-hover)',
          'primary-active': 'var(--color-brand-primary-active)',
          accent: 'var(--color-brand-accent)',
          'accent-light': 'var(--color-brand-accent-light)',
          'accent-dark': 'var(--color-brand-accent-dark)',
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
      },
      fontFamily: {
        sans: 'var(--font-family-base)',
        serif: 'var(--font-family-heading)',
      },
      fontSize: {
        'body-sm': 'var(--font-size-body-sm)',
        'body': 'var(--font-size-body)',
        'body-lg': 'var(--font-size-body-lg)',
        'heading-sm': 'var(--font-size-heading-sm)',
        'heading-md': 'var(--font-size-heading-md)',
        'heading-lg': 'var(--font-size-heading-lg)',
        'heading-xl': 'var(--font-size-heading-xl)',
        'heading-2xl': 'var(--font-size-heading-2xl)',
      },
      spacing: {
        'section-sm': 'var(--space-section-sm)',
        'section': 'var(--space-section)',
        'section-lg': 'var(--space-section-lg)',
        'container-sm': 'var(--space-container-sm)',
        'container': 'var(--space-container)',
        'container-lg': 'var(--space-container-lg)',
      },
      borderRadius: {
        sm: 'var(--border-radius-sm)',
        DEFAULT: 'var(--border-radius)',
        lg: 'var(--border-radius-lg)',
        full: 'var(--border-radius-full)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        modal: 'var(--shadow-modal)',
      },
      transitionDuration: {
        fast: 'var(--primitive-transition-fast)',
        base: 'var(--primitive-transition-base)',
        slow: 'var(--primitive-transition-slow)',
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--primitive-transition-ease)',
      },
      zIndex: {
        navigation: 'var(--z-navigation)',
        modal: 'var(--z-modal)',
        'consent-banner': 'var(--z-consent-banner)',
      },
      minHeight: {
        'button': 'var(--button-min-height)',
        'button-lg': 'var(--button-min-height-lg)',
        'input': 'var(--input-min-height)',
        'hero': 'var(--hero-min-height)',
      },
      minWidth: {
        'button': '24px',  // WCAG 2.2 AA minimum
        'touch-target': '44px',  // iOS minimum
      },
    },
  },
  plugins: [
    // Focus-visible plugin for better keyboard focus
    function({ addBase, theme }) {
      addBase({
        '*:focus-visible': {
          outline: `${theme('borderWidth.2')} solid var(--focus-ring-color)`,
          outlineOffset: 'var(--focus-ring-offset)',
        },
        '*:focus:not(:focus-visible)': {
          outline: 'none',
        },
      });
    },
    // Accessibility utilities
    function({ addUtilities }) {
      addUtilities({
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0',
        },
        '.not-sr-only': {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal',
        },
      });
    },
  ],
};
