import { useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@nextui-org/react'
import { NavProps } from '@props/types'

import { Brand } from '@public/brand'
import { Logo } from '@public/logo'

interface NavComponent {
  blok: NavProps
}

export function Nav({ blok }: NavComponent) {
  // console.log(blok)
  
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  console.log(theme)
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand>
        <Link href='/'>
          <Logo
            classes='max-md:hidden'
            primary={theme == 'dark' ? '#F3F3F2' : '#262C2A'}
            secondary={theme == 'dark' ? '#686D6C' : '#262C2A'}
          />
          <Brand
            classes='md:hidden'
            color={theme == 'dark' ? '#F3F3F2' : '#262C2A'}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className='max-sm:hidden'>
        {blok.navigation.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              href={item.link.cached_url || item.link.url}
              target={item.link.target}
              color='foreground'
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='pr-3'>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <i
              className={`iconoir-${
                theme === 'dark' ? 'sun-light' : 'half-moon'
              }`}
            />
          </button>
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
      </NavbarContent>

      <NavbarMenu>
        {blok.navigation.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              href={item.link.cached_url || item.link.url}
              target={item.link.target}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
