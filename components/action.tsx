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
    link =
      link === router.asPath + '/'
        ? `#${blok.link.anchor}`
        : `${link}#${blok.link.anchor.replaceAll(' ', '-')}`
  }

  const Container = ({ children }: PropsWithChildren) =>
    parent === 'section' ? (
      <div className="col-span-12">{children}</div>
    ) : (
      children
    )

  const Label = blok.label
    ? compiler(blok.label, {
        wrapper: null,
        overrides: Typography({}),
      })
    : 'Azione'

  if (blok.button)
    return (
      <Container>
        <Button
          id={blok.id}
          href={link}
          as={Link}
          size={size}
          isExternal={blok.external}
          color={blok.color || theme || 'default'}
          className="col-auto text-medium font-medium min-w-fit cursor-pointer gap-2"
          {...storyblokEditable(blok)}
        >
          {Label}
        </Button>
      </Container>
    )

  return (
    <Container>
      <Link
        className="col-auto font-medium min-w-fit cursor-pointer gap-2"
        href={link}
        isExternal={blok.external}
        color={blok.color || theme || 'foreground'}
        size={size || 'md'}
      >
        {Label}
      </Link>
    </Container>
  )
}
