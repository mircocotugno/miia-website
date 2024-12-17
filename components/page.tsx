import type { PageProps } from '@props/types'
import Meta from '@components/meta'
import { StoryblokComponent } from '@storyblok/react'

interface PageComponent {
  blok: PageProps
}

export function Page({ blok }: PageComponent) {
  return (
    <>
      <Meta {...blok} />
      {blok.header && <header>header</header>}
      {blok.body && (
        <main>
          {blok.body &&
            blok.body.map((blok, index) => (
              <StoryblokComponent blok={blok} key={index} />
            ))}
        </main>
      )}
      {blok.footer && <footer>footer</footer>}
    </>
  )
}
