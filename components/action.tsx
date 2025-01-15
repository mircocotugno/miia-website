import { Link, Button, NavbarItem, NavbarMenuItem } from '@nextui-org/react'
import { compiler } from 'markdown-to-jsx'
import type { ActionProps } from '@props/types'
import { Typography } from '@components/typography'
import { storyblokEditable } from '@storyblok/react'

interface ActionComponent {
  blok: ActionProps
  parent?: string
}

export function Action({ blok, parent }: ActionComponent) {
  const link: string = blok.link?.cached_url || blok.link.url

  if (parent === 'nav')
    return (
      <NavbarItem {...storyblokEditable(blok)}>
        <Link href={link} target={blok.link.target} color='foreground'>
          {compiler(blok.label, {
            wrapper: null,
            overrides: Typography,
          })}
        </Link>
      </NavbarItem>
    )

  if (parent === 'nav-mobile')
    return (
      <NavbarMenuItem>
        <Link href={link} target={blok.link.target} color='foreground'>
          {compiler(blok.label, {
            wrapper: null,
            overrides: Typography,
          })}
        </Link>
      </NavbarMenuItem>
    )

  return (
    <Button
      href={link}
      target={blok.link.target}
      color='primary'
      size='lg'
      className='mx-2 text-lg font-medium'
      as={Link}
      {...storyblokEditable(blok)}
    >
      {compiler(blok.label, {
        wrapper: null,
        overrides: Typography,
      })}
    </Button>
  )
}
