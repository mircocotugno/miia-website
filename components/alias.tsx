import { AliasProps } from '@props/types'
import { StoryblokComponent } from '@storyblok/react'
import { Column } from '@components/Column'

interface AliasComponent {
  blok: AliasProps
  parent?: string
}

export function Alias({ blok, parent }: AliasComponent) {
  return (
    <Column parent={parent} classes='flex-none'>
      <StoryblokComponent blok={blok.item.content} />
    </Column>
  )
}
