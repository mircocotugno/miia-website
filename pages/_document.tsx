import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { fontSans, fontSerif } from '@config/fonts'
import {
  IubendaProvider,
  IubendaCookieSolutionBannerConfigInterface,
} from '@mep-agency/next-iubenda'

// See https://www.iubenda.com/en/help/1205-how-to-configure-your-cookie-solution-advanced-guide
const iubendaBannerConfig: IubendaCookieSolutionBannerConfigInterface = {
  siteId: Number(process.env.NEXT_PUBLIC_SITE_ID),
  cookiePolicyId: Number(process.env.NEXT_PUBLIC_POLICY_ID),
  lang: 'it',
}

export default function Document() {
  return (
    <Html lang='en' className='scroll-pt-14 scroll-smooth'>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
        />
      </Head>
      <body
        className={`font-sans light text-foreground bg-background min-h-screen ${fontSans.variable} ${fontSerif.variable}`}
      >
        <IubendaProvider bannerConfig={iubendaBannerConfig}>
          <Main />
          <NextScript />
        </IubendaProvider>
      </body>
    </Html>
  )
}