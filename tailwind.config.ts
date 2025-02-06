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
      fontSize: {
        icon: '120%',
        '5xl': '2.75rem',
      },
      colors: {
        dark: '#0a0a0ab3',
        light: '#ffffffb3',
      },
      width: {
        sm: '8rem',
        md: '16rem',
        lg: '32rem',
        xl: '64rem',
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '33.3333%',
        '1/4': '25%',
        sm: '8rem',
        md: '16rem',
        lg: '32rem',
        xl: '64rem',
      },
      maxHeight: {
        modal: '40rem',
        sm: '8rem',
        md: '16rem',
        lg: '32rem',
        xl: '64rem',
      },
      minHeight: {
        '100': '25rem',
        '120': '30rem',
        cover: 'calc(100vh - 4rem)',
        sm: '8rem',
        md: '16rem',
        lg: '32rem',
        xl: '64rem',
        inherit: 'inherit',
      },
      lineHeight: {
        tight: '1.125',
        compact: '.9',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/4': '3 / 4',
      },
      dropShadow: {
        light: [
          '0 0.125rem 0.25rem rgba(256, 256, 256, 0.4)',
          '0 0.75rem 1.25rem rgba(256, 256, 256, 0.2)',
          '0 1.5rem 2rem rgba(256, 256, 256, 0.1)',
        ],
        dark: [
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
