import { Html, Head, Main, NextScript } from 'next/document'

import { fontSans, fontSerif } from '@config/fonts'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css'
        />
      </Head>
      <body
        className={`font-sans text-foreground bg-background min-h-screen ${fontSans.variable} ${fontSerif.variable}`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
