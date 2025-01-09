import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)'],
      serif: ['var(--font-serif)'],
    },
    extend: {
      maxHeight: {
        modal: '40rem',
      },
      minHeight: {
        '100': '25rem',
        cover: '40rem',
      },
      lineHeight: {
        tight: '1.125',
        compact: '.9',
      },
      dropShadow: {
        '8xl': [
          '0 0.125rem 0.25rem rgba(0, 0, 0, 0.4)',
          '0 0.75rem 1.25rem rgba(0, 0, 0, 0.2)',
          '0 1.5rem 2rem rgba(0, 0, 0, 0.1)',
        ],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#ffffff',
            foreground: '#232325',
            primary: {
              DEFAULT: '#008a45',
            },
            secondary: {
              DEFAULT: '#d12934',
            },
          },
        },
        dark: {
          colors: {
            background: '#232325',
            foreground: '#ffffff',
            primary: {
              DEFAULT: '#d12934',
            },
            secondary: {
              DEFAULT: '#008a45',
            },
          },
        },
      },
    }),
  ],
} satisfies Config
