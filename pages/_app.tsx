import '@styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { AppProps } from 'next/app'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { fontSans, fontSerif } from '@config/fonts'

import { Page } from '@components/page'
import { Section } from '@components/section'
import { Nav } from '@components/nav'
import { Cover } from '@components/cover'
import { Heading } from '@components/heading'
import { Action } from '@components/action'
import { Content } from '@components/content'
import { Grid } from '@components/grid'
import { Coach } from '@components/coach'
import { Gallery } from '@components/gallery'
import { Picture } from '@components/picture'
import { Field } from '@components/field'
import { Form } from '@components/form'
import { Accordion } from '@components/accordion'
import { Map } from '@components/map'
import { Article } from '@components/article'
import { Alias } from '@components/alias'
import { Enroll } from '@components/enroll'

const components = {
  page: Page,
  article: Article,
  enroll: Enroll,
  nav: Nav,
  section: Section,
  cover: Cover,
  grid: Grid,
  gallery: Gallery,
  picture: Picture,
  map: Map,
  accordion: Accordion,
  form: Form,
  field: Field,
  heading: Heading,
  content: Content,
  action: Action,
  coach: Coach,
  alias: Alias,
}

console.log(`is preview: ${process.env.IS_PREVIEW}`)

storyblokInit({
  bridge: process.env.IS_PREVIEW === 'true' ? true : false,
  accessToken: process.env.STORYBLOK_PREVIEW,
  use: [apiPlugin],
  components,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='light'>
          <Component {...pageProps} />
        </NextThemesProvider>
      </NextUIProvider>
    </>
  )
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  serif: fontSerif.style.fontStyle,
}
