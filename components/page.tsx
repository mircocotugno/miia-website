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
      {blok.header && <Nav blok={blok.header.content} />}
      {blok.body &&
        blok.body.map((body, index) => (
          <StoryblokComponent blok={body} parent={body.component} key={index} />
        ))}
      {blok.footer && <footer>footer</footer>}
    </>
  )
}
