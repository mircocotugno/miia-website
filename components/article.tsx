import type { ArticleProps } from '@props/types'
import type { ArticleExtraProps } from '@pages/[...slug]'
import { StoryblokComponent } from '@storyblok/react'
import { Meta } from '@components/meta'
import { Nav } from '@components/nav'

interface ArticleComponent {
  blok: ArticleProps
  extra: ArticleExtraProps
}

export function Article({ blok, extra }: ArticleComponent) {
  return (
    <>
      <Meta {...blok} />
      {extra?.header && <Nav blok={extra.header.content} />}
      {blok.body &&
        blok.body.map((body, index) => (
          <StoryblokComponent blok={body} parent={body.component} key={index} />
        ))}
    </>
  )
}