import type { ContentProps } from '@props/types'
import { compiler } from 'markdown-to-jsx'
import { Typography } from '@components/typography'
import { storyblokEditable } from '@storyblok/react'
import { Column } from '@components/column'

interface ContentComponent {
  blok: ContentProps
  parent?: string
}

export function Content({ blok, parent }: ContentComponent) {
  return (
    <Column parent={parent} classes='flex-1 min-w-60 lg:min-w-60'>
      <div
        className='w-full h-full space-y-4 backdrop-blur-sm'
        {...storyblokEditable(blok)}
      >
        {compiler(blok.head, { wrapper: null, overrides: Typography })}

        {compiler(blok.body, {
          wrapper: null,
          overrides: Typography,
        })}
      </div>
    </Column>
  )
}
