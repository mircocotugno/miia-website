import { Montserrat, Playfair_Display } from 'next/font/google'

export const fontSans = Montserrat({
  variable: '--font-sans',
  subsets: ['latin'],
})

export const fontSerif = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
})
