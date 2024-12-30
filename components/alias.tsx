import { AliasProps } from '@props/types'
import { StoryblokComponent } from '@storyblok/react'

interface AliasComponent {
  blok: AliasProps
  parent?: string
}

export function Alias({ blok }: AliasComponent) {
  return <StoryblokComponent blok={blok.item.content} />
}