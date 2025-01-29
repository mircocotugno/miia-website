import { Button, Link } from '@nextui-org/react'
import type { ActionProps, Sizes } from '@props/types'
import { compiler } from 'markdown-to-jsx'
import { storyblokEditable } from '@storyblok/react'
import { Typography } from './typography'

interface ActionComponent {
  blok: ActionProps
  size?: 'sm' | 'md' | 'lg'
}

export function Action({ blok, size }: ActionComponent) {
  const link = blok.link.cached_url || blok.link.url

  if (blok.button)
    return (
      <Button
        id={blok.id}
        as={Link}
        target={blok.link.target}
        color='primary'
        size='lg'
        href={link}
        className='col-auto font-bold self-start min-w-fit'
        {...storyblokEditable(blok)}
      >
        {blok.label &&
          compiler(blok.label, { wrapper: null, overrides: Typography })}
      </Button>
    )

  return (
    <Link
      className='col-auto self-start font-medium min-w-fit'
      href={link}
      target={blok.link.target}
      color='foreground'
      size={size || 'md'}
    >
      {blok.label &&
        compiler(blok.label, { wrapper: null, overrides: Typography })}
    </Link>
  )
}
