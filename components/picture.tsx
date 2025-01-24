import type { PictureProps } from '@props/types'
import { Image } from '@nextui-org/react'
import { storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'

interface PictureComponent {
  blok: PictureProps
  parent?: string
}

export function Picture({ blok, parent }: PictureComponent) {
  const sizes = {
    sm: 80,
    md: 160,
    lg: 320,
    xl: 480,
  }
  // max-sm:min-w-10 min-w-20
  return (
    <Image
      {...storyblokEditable(blok)}
      src={blok.image.filename}
      alt={blok.image.alt}
      width={sizes[blok?.style] || '100%'}
      classNames={{ wrapper: classes({ asColumn: parent === 'section' }) }}
    />
  )
}

const classes = tv({
  variants: {
    asColumn: {
      true: 'col-span-3',
    },
  },
})
