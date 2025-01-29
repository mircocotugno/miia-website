import type { PageProps } from '@props/types'
import { StoryblokComponent } from '@storyblok/react'
import { Meta } from '@components/meta'
import { Nav } from '@components/nav'

interface PageComponent {
  blok: PageProps
}

export function Page({ blok }: PageComponent) {
  return (
    <>
      <Meta {...blok} />
      {blok.header && <Nav parent='header' blok={blok.header.content} />}
      <main className='min-h-screen'>
        {blok.body &&
          blok.body.map((body, index) => (
            <StoryblokComponent blok={body} parent='page' key={index} />
          ))}
      </main>
      {blok.footer && <Nav parent='footer' blok={blok.footer.content} />}
    </>
  )
}
