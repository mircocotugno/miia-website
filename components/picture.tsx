import type { PictureProps } from '@props/types'
import { Image } from '@nextui-org/react'
import { storyblokEditable } from '@storyblok/react'
import { Column } from '@components/Column'
import { parentPort } from 'worker_threads'

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
  return (
    <Column parent={parent} classes='flex-none max-sm:min-w-10 min-w-20'>
      <Image
        {...storyblokEditable(blok)}
        src={blok.image.filename}
        alt={blok.image.alt}
        width={sizes[blok?.style] || '100%'}
      />
    </Column>
  )
}
