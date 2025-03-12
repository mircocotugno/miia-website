import '@styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { GoogleTagManager } from '@next/third-parties/google'
import {
  IubendaProvider,
  IubendaCookieSolutionBannerConfigInterface,
  useIubenda,
} from '@mep-agency/next-iubenda'

import { storyblokInit, apiPlugin } from '@storyblok/react'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { fontSans, fontSerif } from '@config/fonts'

import Page from '@components/page'
import Section from '@components/section'
import Nav from '@components/nav'
import Text from '@components/text'
import Action from '@components/action'
import Picture from '@components/picture'
import Field from '@components/field'
import Form from '@components/form'
import Map from '@components/map'
import Article from '@components/article'
import List from '@components/list'
import Carousel from '@components/carousel'
import Aside from '@components/aside'
import Person from '@components/person'
import Event from '@components/event'
import Course from '@components/course'
import Location from '@components/location'
import Video from '@components/video'
import Wrapper from '@components/wrapper'
import Alias from '@components/alias'
import Background from '@components/background'
import Image from '@components/image'
import Gallery from '@components/gallery'
import Menu from '@components/menu'
import Process from '@components/process'

const components = {
  page: Page,
  article: Article,
  nav: Nav,
  list: List,
  menu: Menu,
  process: Process,
  alias: Alias,
  section: Section,
  aside: Aside,
  wrapper: Wrapper,
  carousel: Carousel,
  picture: Picture,
  video: Video,
  image: Image,
  background: Background,
  gallery: Gallery,
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

// See https://www.iubenda.com/en/help/1205-how-to-configure-your-cookie-solution-advanced-guide
const iubendaBannerConfig: IubendaCookieSolutionBannerConfigInterface = {
  siteId: Number(process.env.NEXT_PUBLIC_SITE_ID),
  cookiePolicyId: Number(process.env.NEXT_PUBLIC_POLICY_ID),
  lang: 'it',
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <IubendaProvider bannerConfig={iubendaBannerConfig}>
        <HeroUIProvider>
          <NextThemesProvider attribute='class' defaultTheme='light'>
            <Component {...pageProps} />
          </NextThemesProvider>
        </HeroUIProvider>
        <Tracking />
      </IubendaProvider>
    </>
  )
}

const Tracking = () => {
  const { userPreferences } = useIubenda()
  return (
    userPreferences.hasBeenLoaded && (
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM || ''} />
    )
  )
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  serif: fontSerif.style.fontStyle,
}
