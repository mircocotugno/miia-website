import type { ContentProps } from '@props/types'
import { compiler } from 'markdown-to-jsx'
import { tv } from 'tailwind-variants'
import { Typography } from '@components/typography'
import { storyblokEditable } from '@storyblok/react'
import { Image } from '@nextui-org/react'

interface ContentComponent {
  blok: ContentProps
  parent?: string
}

export function Content({ blok, parent }: ContentComponent) {
  return (
    <div
      className={classes({ asColumn: parent === 'section' })}
      {...storyblokEditable(blok)}
    >
      {blok.image?.filename && (
        <Image src={blok.image.filename} alt={blok.image.alt} width={'100%'} />
      )}
      {blok.head && (
        <header>
          {compiler(blok.head, { wrapper: null, overrides: Typography })}
        </header>
      )}
      <article className='line-clamp-3 sm:line-clamp-none space-y-2'>
        {compiler(blok.body, {
          wrapper: null,
          overrides: Typography,
        })}
      </article>
    </div>
  )
}

const classes = tv({
  base: 'h-full space-y-4 backdrop-blur-sm',
  variants: {
    asColumn: {
      true: 'col-span-6',
    },
  },
})
