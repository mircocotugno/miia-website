import type { TextProps } from '@props/types'
import { Typography } from './typography'
import { storyblokEditable } from '@storyblok/react'
import { compiler } from 'markdown-to-jsx'
import { tv } from 'tailwind-variants'

interface TextComponent {
  blok: TextProps
}

export default function Text({ blok }: TextComponent) {
  const typography = {
    theme: blok.theme,
  }
  return (
    <article
      key={blok._uid}
      className={textClasses({
        justify: blok.justify,
        sm: blok.width?.[0],
        md: blok.width?.[1],
        lg: blok.width?.[2],
        xl: blok.width?.[3],
      })}
      {...storyblokEditable(blok)}
    >
      {blok.title &&
        compiler(blok.title, {
          wrapper: ({ children }) => (
            <div
              key={`${blok._uid}_title`}
              className={titleClases({
                hide: blok.hide === 'all' || blok.hide.includes('title'),
              })}
            >
              {children}
            </div>
          ),
          forceWrapper: true,
          overrides: Typography(typography),
        })}
      {blok.description &&
        compiler(blok.description, {
          wrapper: ({ children }) => (
            <div
              key={`${blok._uid}_description`}
              className={descriptionClasses({
                hide: blok.hide === 'all' || blok.hide.includes('description'),
              })}
            >
              {children}
            </div>
          ),
          forceWrapper: true,
          overrides: Typography(typography),
        })}
    </article>
  )
}

const titleClases = tv({
  base: 'space-y-6 leading-tight',
  variants: {
    hide: {
      true: 'hidden sm:block',
    },
  },
})

const descriptionClasses = tv({
  base: 'space-y-2 leading-relaxed opacity-85',
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
      '1/1': 'sm:col-span-12',
    },
    md: {
      '1/4': 'md:col-span-3',
      '1/3': 'md:col-span-4',
      '1/2': 'md:col-span-6',
      '2/3': 'md:col-span-8',
      '3/4': 'md:col-span-9',
      '1/1': 'md:col-span-12',
    },
    lg: {
      '1/4': 'lg:col-span-3',
      '1/3': 'lg:col-span-4',
      '1/2': 'lg:col-span-6',
      '2/3': 'lg:col-span-8',
      '3/4': 'lg:col-span-9',
      '1/1': 'lg:col-span-12',
    },
    xl: {
      '1/4': 'xl:col-span-3',
      '1/3': 'xl:col-span-4',
      '1/2': 'xl:col-span-6',
      '2/3': 'xl:col-span-8',
      '3/4': 'xl:col-span-9',
      '1/1': 'xl:col-span-12',
    },
  },
})
