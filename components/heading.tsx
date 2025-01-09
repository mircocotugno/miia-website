import type { HeadingProps } from '@props/types'
import { Typography } from '@components/typography'
import { Link } from '@nextui-org/react'
import { compiler } from 'markdown-to-jsx'
import { storyblokEditable } from '@storyblok/react'

interface HeadingComponent {
  blok: HeadingProps
  parent?: string
}
// backdrop-blur-sm
export function Heading({ blok }: HeadingComponent) {
  return (
    <div
      {...storyblokEditable(blok)}
      className='font-serif space-y-6 leading-none drop-shadow-8xl break-words'
    >
      {compiler(blok.body, {
        wrapper: null,
        forceWrapper: true,
        overrides: Typography,
      })}
    </div>
  )
}
