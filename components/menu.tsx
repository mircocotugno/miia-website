import { MenuProps } from '@props/types'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
  Button,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/react'
import { Column } from '@components/column'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { useState } from 'react'

interface MenuComponent {
  blok: MenuProps
  parent?: string
}

export function Menu({ blok, parent }: MenuComponent) {
  const [isOpen, setIsOpen] = useState(false)
  if (parent === 'nav')
    return (
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Link color='foreground'>{blok.label}</Link>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label={blok.id}
          classNames={{
            base: 'bg-background/70 backdrop-blur-lg',
            list: 'shadow-none',
          }}
        >
          {blok.links.map((item, index) => (
            <DropdownItem key={index}>
              <Link
                href={item.link.cached_url || item.link.url}
                target={item.link.target}
                color='foreground'
              >
                {compiler(item.label, { wrapper: null, overrides: Typography })}
              </Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    )

  if (parent === 'nav-mobile')
    return (
      <NavbarMenuItem className='text-small'>
        <Button
          variant='light'
          size='lg'
          className='px-0 min-w-0 h-auto '
          onPress={() => setIsOpen(!isOpen)}
        >
          {blok.label}
          <i className={`iconoir-nav-arrow-${isOpen ? 'up' : 'down'}`} />
        </Button>
        <ul
          className={`flex flex-col pl-3 transition-all ease-in-out ${isOpen ? 'visible opacity-100 h-auto pt-3 gap-3' : 'invisible opacity-0 h-0 pt-0 gap-0'}`}
        >
          {blok.links.map((item, index) => (
            <li>
              <Link
                href={item.link.cached_url || item.link.url}
                target={item.link.target}
                color='foreground'
                key={index}
              >
                <></>
                {compiler(item.label, {
                  wrapper: null,
                  overrides: Typography,
                })}
              </Link>
            </li>
          ))}
        </ul>
      </NavbarMenuItem>
    )

  return (
    <Column parent={parent} classes='flex-0'>
      <>
        <p className='text-md mb-2'>{blok.label}</p>
        <hr className='opacity-10 mb-4'/>
        <ul className="space-y-2">
          {blok.links.map((item, index) => (
            <li>
              <Link
                href={item.link.cached_url || item.link.url}
                target={item.link.target}
                size='sm'
                color="foreground"
              >
                {compiler(item.label, { wrapper: null, overrides: Typography })}
              </Link>
            </li>
          ))}
        </ul>
      </>
    </Column>
  )
}
