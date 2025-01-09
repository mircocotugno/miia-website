import type { ArticleProps } from '@props/types'
import { StoryblokComponent } from '@storyblok/react'
import { Meta } from '@components/meta'

interface ArticleComponent {
  blok: ArticleProps
  parent?: string
}

export function Article({ blok }: ArticleComponent) {
  return (
    <>
      <Meta {...blok} />
      {blok.body &&
        blok.body.map((body, index) => (
          <StoryblokComponent blok={body} parent={body.component} key={index} />
        ))}
    </>
  )
}
