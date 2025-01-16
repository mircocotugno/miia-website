import { useState } from 'react'
import { useTheme } from 'next-themes'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
} from '@nextui-org/react'
import type { NavProps } from '@props/types'
import { Typography } from '@components/typography'

import { Brand } from '@public/brand'
import { Logo } from '@public/logo'
import { compiler } from 'markdown-to-jsx'
import { StoryblokComponent } from '@storyblok/react'

interface NavComponent {
  blok: NavProps
  parent?: string
}

export function Nav({ blok, parent }: NavComponent) {
  return parent === 'header' ? <Header {...blok} /> : <Footer {...blok} />
}

function Header(blok: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth='xl' className='my-auto'>
      <NavbarBrand>
        <Link href='/'>
          <Logo
            classes='max-md:hidden'
            // primary={theme == 'dark' ? '#F3F3F2' : '#262C2A'}
            // secondary={theme == 'dark' ? '#686D6C' : '#262C2A'}
            primary='#F3F3F2'
            secondary='#686D6C'
          />
          <Brand
            classes='md:hidden'
            // color={theme == 'dark' ? '#F3F3F2' : '#262C2A'}
            color='#F3F3F2'
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className='max-sm:hidden gap-6'>
        {blok.links.map((item, index) => (
          <StoryblokComponent blok={item} parent='nav' key={index} />
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        {blok.actions.map((item, index) => (
          <NavbarItem key={index} className='max-sm:hidden'>
            <Button
              href={item.link?.cached_url || item.link.url}
              target={item.link.target}
              color='primary'
              as={Link}
            >
              {compiler(item.label, { wrapper: null, overrides: Typography })}
            </Button>
          </NavbarItem>
        ))}
        {/* <NavbarItem className='pr-3'>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <i
              className={`iconoir-${
                theme === 'dark' ? 'sun-light' : 'half-moon'
              }`}
            />
          </button>
        </NavbarItem> */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
      </NavbarContent>

      <NavbarMenu className='py-6 gap-6'>
        {blok.links.map((item, index) => (
          <StoryblokComponent blok={item} parent='nav-mobile' key={index} />
        ))}
        {blok.actions.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Button
              href={item.link.cached_url || item.link.url}
              target={item.link.target}
              color='primary'
              as={Link}
            >
              {compiler(item.label, { wrapper: null, overrides: Typography })}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

function Footer(blok: NavProps) {
  return (
    <footer className='bg-background text-foreground py-12 space-y-12'>
      <div className='px-6 mx-auto space-y-6 max-w-[1280px] min-h-inherit'>
        <Link href='/'>
          <Logo
            classes='max-md:hidden'
            // primary={theme == 'dark' ? '#F3F3F2' : '#262C2A'}
            // secondary={theme == 'dark' ? '#686D6C' : '#262C2A'}
            primary='#F3F3F2'
            secondary='#686D6C'
          />
          <Brand
            classes='md:hidden'
            // color={theme == 'dark' ? '#F3F3F2' : '#262C2A'}
            color='#F3F3F2'
          />
        </Link>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-6 lg:gap-8'>
          {blok.links.map((item, index) => (
            <div className='flex-1'>
              <StoryblokComponent parent='footer' blok={item} key={index} />
            </div>
          ))}
        </div>
      </div>
      <div className='px-6 mx-auto space-y-6 max-w-[1280px] min-h-inherit'>
        <p className='text-xs '>
          {compiler(blok.message, { wrapper: null, overrides: Typography })}
        </p>
      </div>
    </footer>
  )
}
