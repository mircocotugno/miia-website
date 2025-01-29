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
import { Text } from '@components/text'
import { Action } from '@components/action'
import { Gallery } from '@components/gallery'
import { Picture } from '@components/picture'
import { Field } from '@components/field'
import { Form } from '@components/form'
import { Map } from '@components/map'
import { Article } from '@components/article'
import { Enroll } from '@components/enroll'
import { List } from '@components/list'
import { Carousel } from '@components/carousel'
import { Wrapper } from '@components/wrapper'
import { Alias } from '@components/alias'
import { Person } from '@components/person'
import { Event } from '@components/event'
import { Course } from '@components/course'
import { Location } from '@components/location'

const components = {
  page: Page,
  article: Article,
  enroll: Enroll,
  nav: Nav,
  list: List,
  alias: Alias,
  section: Section,
  wrapper: Wrapper,
  gallery: Gallery,
  carousel: Carousel,
  picture: Picture,
  map: Map,
  form: Form,
  field: Field,
  text: Text,
  action: Action,
  person: Person,
  event: Event,
  course: Course,
  location: Location,
}

storyblokInit({
  bridge: process.env.NEXT_PUBLIC_IS_PREVIEW === 'true' ? true : false,
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW,
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
