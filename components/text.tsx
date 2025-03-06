import type { TextProps } from '@props/types'
import { Typography } from './typography'
import { storyblokEditable } from '@storyblok/react'
import { compiler } from 'markdown-to-jsx'
import { tv } from 'tailwind-variants'

interface TextComponent {
  blok: TextProps
}

const settings = { wrapper: null, forceWrapper: true, overrides: Typography }

export default function Text({ blok }: TextComponent) {
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

  const Description = () => (
    <div
      className={descriptionClasses({
        hide: blok.hide === 'all' || blok.hide.includes('description'),
      })}
    >
      {compiler(blok.description, settings)}
    </div>
  )

  return (
    <article
      className={textClasses({
        justify: blok.justify,
        sm: blok.width?.[0],
        md: blok.width?.[1],
        lg: blok.width?.[2],
        xl: blok.width?.[3],
      })}
      {...storyblokEditable(blok)}
    >
      {blok.title && <Title />}
      {blok.description && <Description />}
    </article>
  )
}

const titleClases = tv({
  base: 'space-y-6',
  variants: {
    hide: {
      true: 'hidden sm:block',
    },
  },
})

const descriptionClasses = tv({
  base: 'space-y-2',
  variants: {
    hide: {
      true: 'hidden sm:block',
    },
  },
})

const textClasses = tv({
  base: 'flex-1 flex flex-col align-stretch gap-2 lg:gap-4 col-span-12 min-w-32 text-left',
  variants: {
    justify: {
      right: 'sm:text-right',
      center: 'sm:text-center',
      left: 'sm:text-left',
    },
    sm: {
      '1/4': 'sm:col-span-3',
      '1/3': 'sm:col-span-4',
      '1/2': 'sm:col-span-6',
      '2/3': 'sm:col-span-8',
      '3/4': 'sm:col-span-9',
    },
    md: {
      '1/4': 'md:col-span-3',
      '1/3': 'md:col-span-4',
      '1/2': 'md:col-span-6',
      '2/3': 'md:col-span-8',
      '3/4': 'md:col-span-9',
    },
    lg: {
      '1/4': 'lg:col-span-3',
      '1/3': 'lg:col-span-4',
      '1/2': 'lg:col-span-6',
      '2/3': 'lg:col-span-8',
      '3/4': 'lg:col-span-9',
    },
    xl: {
      '1/4': 'xl:col-span-3',
      '1/3': 'xl:col-span-4',
      '1/2': 'xl:col-span-6',
      '2/3': 'xl:col-span-8',
      '3/4': 'xl:col-span-9',
    },
  },
})
