import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Paleta profesional despacho legal
        primary: {
          50: '#f0f4f8',
          100: '#d9e6f2',
          200: '#b3cce5',
          300: '#8db3d8',
          400: '#6799cb',
          500: '#4180be',
          600: '#1B365D', // Color principal
          700: '#0F2438', // Color oscuro
          800: '#0A1A2A',
          900: '#051015',
        },
        secondary: {
          50: '#f0f4f8',
          100: '#d9e6f2',
          200: '#b3cce5',
          300: '#8db3d8',
          400: '#6B8AAB', // Color claro
          500: '#4A6B8A', // Color secundario
          600: '#2C4A6B', // Color oscuro
          700: '#1e3447',
          800: '#0f1a23',
          900: '#080f15',
        },
        accent: {
          50: '#fdf9f0',
          100: '#faf2d9',
          200: '#f5e5b3',
          300: '#f0d88d',
          400: '#ebcb67',
          500: '#E6C547', // Color claro
          600: '#D4AF37', // Color de acento
          700: '#B8941F', // Color oscuro
          800: '#9a7a1a',
          900: '#7c6015',
        },
        neutral: {
          50: '#f8fafc',
          100: '#F4F6F8',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0B1220',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#0E9F6E',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#B45309',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        serif: ['IBM Plex Serif', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral.700'),
            maxWidth: '70ch',
            a: {
              color: theme('colors.primary.600'),
              fontWeight: '600',
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.primary.700'),
                textDecoration: 'underline',
              },
            },
            h1: {
              color: theme('colors.neutral.900'),
              fontFamily: theme('fontFamily.serif'),
            },
            h2: {
              color: theme('colors.neutral.900'),
              fontFamily: theme('fontFamily.serif'),
              scrollMarginTop: '6rem',
            },
            h3: {
              color: theme('colors.neutral.900'),
              fontFamily: theme('fontFamily.serif'),
            },
            strong: {
              color: theme('colors.neutral.900'),
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.200'),
              color: theme('colors.neutral.800'),
              fontStyle: 'normal',
            },
            'ul > li::marker': {
              color: theme('colors.primary.500'),
            },
            'ol > li::marker': {
              color: theme('colors.primary.500'),
            },
            code: {
              color: theme('colors.primary.600'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography()],
};
