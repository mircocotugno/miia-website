import type { TextProps } from '@props/types'
import { Typography } from './typography'
import { storyblokEditable } from '@storyblok/react'
import { compiler } from 'markdown-to-jsx'
import { tv } from 'tailwind-variants'

interface TextComponent {
  blok: TextProps
}

const settings = { wrapper: null,forceWrapper: true , overrides: Typography }

export default function Text({ blok }: TextComponent) {
  const titleClases = tv({
    base: 'space-y-6',
    variants: {
      hide: {
        true: 'hidden sm:block',
      },
    },
  })

  const Title = () => (
    <div
      className={titleClases({
        hide: blok.hide === 'all' || blok.hide.includes('title'),
      })}
    >
      {compiler(blok.title, {
        wrapper: null,
        forceWrapper: true,
        overrides: Typography,
      })}
    </div>
  )

  const descriptionClasses = tv({
    base: 'space-y-2',
    variants: {
      hide: {
        true: 'hidden sm:block',
      },
    },
  })
  const Description = () => (
    <div
      className={descriptionClasses({
        hide: blok.hide === 'all' || blok.hide.includes('description'),
      })}
    >
      {compiler(blok.description, settings)}
    </div>
  )

  const textClasses = tv({
    base: 'flex-1 flex flex-col align-stretch gap-2 lg:gap-4 col-span-12 min-w-32 text-left',
    variants: {
      justify: {
        right: 'sm:text-right',
        center: 'sm:text-center',
        left: 'sm:text-left',
      },
    },
  })
  return (
    <article
      className={textClasses({ justify: blok.justify })}
      {...storyblokEditable(blok)}
    >
      {blok.title && <Title />}
      {blok.description && <Description />}
    </article>
  )
}
