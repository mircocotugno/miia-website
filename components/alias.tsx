import { AliasProps } from '@props/types'
import { StoryblokComponent } from '@storyblok/react'

interface AliasComponent {
  blok: AliasProps
  parent?: string
}

export function Alias({ blok, parent }: AliasComponent) {
  if (!blok.item?.content) return null
  return (
    <StoryblokComponent
      parent='alias'
      blok={blok.item.content}
      slug={blok.item.full_slug}
    />
  )
}
