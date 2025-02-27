import type { LocationProps, PageProps } from '@props/types'
import { StoryblokComponent } from '@storyblok/react'
import Meta from '@components/meta'
import Nav from '@components/nav'
import { tv } from 'tailwind-variants'

interface PageComponent {
  blok: PageProps
  locations: Array<LocationProps>
}

const classes = tv({
  base: 'relative',
  variants: {
    sections: {
      true: 'min-h-fit',
      false: 'min-h-screen',
    },
  },
})

export default function Page({ blok, locations }: PageComponent) {
  return (
    <>
      <Meta {...blok} />
      {blok.header && <Nav parent='header' blok={blok.header.content} />}
      <main className={classes({ sections: blok.body.length === 1 })}>
        {blok.body &&
          blok.body.map((body, index) => (
            <StoryblokComponent
              blok={body}
              parent='page'
              locations={locations}
              key={index}
            />
          ))}
      </main>
      {blok.footer && <Nav parent='footer' blok={blok.footer.content} />}
    </>
  )
}
