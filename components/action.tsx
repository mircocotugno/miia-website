import { Link, Button, NavbarItem } from '@nextui-org/react'
import { compiler } from 'markdown-to-jsx'
import type { ActionProps } from '@props/types'
import type { ReactElement } from 'react'

interface ActionComponent {
  blok: ActionProps
  parent?: string
}

export function Action({ blok, parent }: ActionComponent) {
  const link: string = blok.link?.cached_url || blok.link.url

  if (parent === 'nav') {
    return (
      <NavbarItem>
        <Link href={link} target={blok.link.target} color='foreground'>
          {compiler(blok.label, {
            wrapper: null,
            overrides: overrides,
          })}
        </Link>
      </NavbarItem>
    )
  }

  return (
    <Button
      href={link}
      target={blok.link.target}
      color='primary'
      className='mr-2'
      as={Link}
    >
      {compiler(blok.label, {
        wrapper: null,
        overrides: overrides,
      })}
    </Button>
  )
}

const overrides = {
  code: {
    component: ({ children }: { children: string }) => (
      <i className={`iconoir-${children}`} />
    ),
  },
}
