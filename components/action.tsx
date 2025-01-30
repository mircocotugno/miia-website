import { Button, Link } from '@nextui-org/react'
import type { ActionProps, Sizes } from '@props/types'
import { compiler } from 'markdown-to-jsx'
import { storyblokEditable } from '@storyblok/react'
import { Typography } from './typography'
import type { PropsWithChildren } from 'react'

interface ActionComponent {
  blok: ActionProps
  parent?: string
  theme?: 'default' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function Action({ blok, parent, theme, size }: ActionComponent) {
  const link = blok.link.cached_url || blok.link.url

  const Container = ({ children }: PropsWithChildren) =>
    parent === 'section' ? (
      <div className='col-span-12'>{children}</div>
    ) : (
      children
    )

  if (blok.button)
    return (
      <Container>
        <Button
          id={blok.id}
          as={Link}
          target={blok.link.target}
          color={theme || 'primary'}
          size={size || 'lg'}
          href={link}
          className='col-auto font-bold self-start min-w-fit'
          {...storyblokEditable(blok)}
        >
          {blok.label &&
            compiler(blok.label, { wrapper: null, overrides: Typography })}
        </Button>
      </Container>
    )

  return (
    <Container>
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
    </Container>
  )
}
