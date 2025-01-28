import { Button, Link } from '@nextui-org/react'
import type { ActionProps } from '@cms/components'
import { compiler } from 'markdown-to-jsx'
import { storyblokEditable } from '@storyblok/react'
import { Typography } from './typography'

interface ActionComponent {
  blok: ActionProps
}

export function Action({ blok }: ActionComponent) {
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
        className='col-auto min-w-fit'
        {...storyblokEditable(blok)}
      >
        {blok.label &&
          compiler(blok.label, { wrapper: null, overrides: Typography })}
      </Button>
    )

  return (
    <Link className='col-auto min-w-fit' href={link} target={blok.link.target} color='foreground'>
      {blok.label &&
        compiler(blok.label, { wrapper: null, overrides: Typography })}
    </Link>
  )
}
