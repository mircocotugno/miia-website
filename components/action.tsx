import { Button, Link } from '@heroui/react'
import type { ActionProps } from '@props/types'
import { compiler } from 'markdown-to-jsx'
import { storyblokEditable } from '@storyblok/react'
import { Typography } from './typography'
import type { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'

interface ActionComponent {
  blok: ActionProps
  parent?: string
  theme?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export default function Action({ blok, parent, theme, size }: ActionComponent) {
  const router = useRouter()
  let link = blok.link.url || `/${blok.link.cached_url}`
  if (blok.link?.anchor) {
    link = link.startsWith(router.asPath)
      ? `#${blok.link.anchor}`
      : `${link}#${blok.link.anchor}`
  }

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
          color={theme || blok.color || 'default'}
          size={size}
          href={link}
          className='col-auto font-bold self-start min-w-fit cursor-pointer'
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
        className='col-auto self-start font-medium min-w-fit cursor-pointer'
        href={link}
        target={blok.link.target}
        color={theme || blok.color || 'foreground'}
        size={size || 'md'}
      >
        {blok.label &&
          compiler(blok.label, { wrapper: null, overrides: Typography })}
      </Link>
    </Container>
  )
}
