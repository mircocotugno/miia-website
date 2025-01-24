import type { HeadingProps } from '@props/types'
import { Typography } from '@components/typography'
import { tv } from 'tailwind-variants'
import { compiler } from 'markdown-to-jsx'
import { storyblokEditable } from '@storyblok/react'

interface HeadingComponent {
  blok: HeadingProps
  parent?: string
}
// backdrop-blur-sm
export function Heading({ blok, parent }: HeadingComponent) {
  return (
    <div
      {...storyblokEditable(blok)}
      className={classes({
        asColumn: parent === 'section',
      })}
    >
      {compiler(blok.body, {
        wrapper: null,
        forceWrapper: true,
        overrides: Typography,
      })}
    </div>
  )
}

const classes = tv({
  base: 'font-serif space-y-6 leading-none break-words',
  variants: {
    asColumn: {
      true: 'col-span-12',
      false: 'drop-shadow-8xl',
    },
  },
})
