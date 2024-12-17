import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import { NextUIProvider } from '@nextui-org/react'

import { Montserrat, Playfair_Display } from 'next/font/google'
import { Page } from '@components/page'
import { Section } from '@components/section'

const geistSans = Montserrat({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistSerif = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
})

const components = {
  page: Page,
  section: Section,
}

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <div className={`${geistSans.variable} ${geistSerif.variable}`}>
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  )
}
