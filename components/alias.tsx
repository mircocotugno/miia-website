import type { AliasProps, StoryProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'

interface AliasComponent {
  blok: AliasProps
}

export function Alias({ blok }: AliasComponent) {
  if (typeof blok.resource === 'string') return null

  const classes = tv({
    base: 'col-span-12 sm:col-span-6',
    variants: {
      size: {
        small: 'sm:col-span-3',
        medium: 'sm:col-span-4',
        large: 'sm:col-span-8',
        extra: 'sm:col-span-9',
      },
      order: {
        true: `order-${blok.order}`,
      },
    },
  })

  return (
    <div
      className={classes({
        size: blok.size,
        order: blok.order >= 0,
      })}
      {...storyblokEditable(blok)}
    >
      <StoryblokComponent blok={blok.resource.content} story={blok.resource} />
    </div>
  )
}
