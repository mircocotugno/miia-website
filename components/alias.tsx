import type { AliasProps, StoryProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'

interface AliasComponent {
  blok: AliasProps
}

export function Alias({ blok }: AliasComponent) {
  if (typeof blok.resource === 'string') return null

  const type = blok.resource.content.component

  const classes = tv({
    base: 'col-span-12 sm:col-span-6',
    variants: {
      type: {
        location: '',
        person: 'col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2',
        article: 'md:col-span-8',
        course: '',
        event: '',
        form: '',
      },
      size: {
        small: 'sm:col-span-3',
        medium: 'sm:col-span-4',
        large: 'sm:col-span-8',
        extra: 'sm:col-span-9',
        full: 'sm:col-span-12',
      },
      order: {
        true: `order-${blok.order}`,
      },
    },
  })

  return (
    <div
      className={classes({
        type: type,
        size: blok.size,
        order: blok.order >= 0,
      })}
      {...storyblokEditable(blok)}
    >
      <StoryblokComponent blok={blok.resource.content} story={blok.resource} />
    </div>
  )
}
