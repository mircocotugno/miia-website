import Head from 'next/head'
import { useRouter } from 'next/router'
import { MetaProps } from '@props/types'

const meta = {
  title: '',
  description: '',
  image: {
    fielname: '',
    alt: '',
  },
}

export default function Meta(blok: MetaProps) {
  const router = useRouter()

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1'
      />

      <meta name='og:site_name' content='Made in Italy Academy' />
      <link rel='canonical' href={router.asPath} />
      <meta name='og:url' content={router.asPath} />

      <meta name='og:type' content='website' />

      <title>{blok.title || meta.title}</title>
      <meta name='og:title' content={blok.title || meta.title} key='title' />
      <meta name='twitter:title' content={blok.title || meta.title} />

      <meta
        name='description'
        content={blok.description || meta.description}
        key='desc'
      />
      <meta
        name='og:description'
        content={blok.description || meta.description}
        key='description'
      />

      <meta
        name='og:image'
        content={blok.image?.filename || meta.image.fielname}
      />
      <meta
        name='twitter:image'
        content={blok.image?.filename || meta.image.fielname}
      />
      <meta
        name='twitter:image:alt'
        content={blok.image?.alt || meta.image.alt}
      />
    </Head>
  )
}
