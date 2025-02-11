import type { NavProps } from '@props/types'
import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@heroui/react'
import { Typography } from './typography'

import { Brand } from '@public/brand'
import { Logo } from '@public/logo'
import { compiler } from 'markdown-to-jsx'
import { StoryblokComponent } from '@storyblok/react'

interface NavComponent {
  blok: NavProps
  parent: 'header' | 'footer'
}

const templates = {
  header: Header,
  footer: Footer,
}

export function Nav({ blok, parent }: NavComponent) {
  const Template = templates[parent]
  return <Template blok={blok} />
}

function Header({ blok }: { blok: NavProps }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className='dark bg-background text-foreground'
      classNames={{ wrapper: 'max-w-[1280px] mx-auto' }}
    >
      <NavbarBrand className='grow-0'>
        <Link href='/'>
          <Logo
            classes='sm:max-md:hidden'
            // primary={theme == 'dark' ? '#F3F3F2' : '#262C2A'}
            // secondary={theme == 'dark' ? '#686D6C' : '#262C2A'}
            primary='#F3F3F2'
            secondary='#686D6C'
          />
          <Brand
            classes='max-sm:hidden md:hidden'
            // color={theme == 'dark' ? '#F3F3F2' : '#262C2A'}
            color='#F3F3F2'
          />
        </Link>
      </NavbarBrand>
      <NavbarContent justify='start' className='max-sm:hidden gap-6'>
        {blok.contents.map((item, index) => (
          <NavbarItem key={index}>
            <StoryblokComponent blok={item} />
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
      </NavbarContent>

      <NavbarMenu className='py-6 px-10 gap-6 items-end'>
        {blok.contents.map((item, index) => (
          <NavbarMenuItem key={index}>
            <StoryblokComponent blok={item} key={index} />
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

function Footer({ blok }: { blok: NavProps }) {
  return (
    <footer className='dark bg-background text-foreground py-12 space-y-12'>
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
          {blok.contents.map((item, index) => (
            <div className='flex-1' key={index}>
              <StoryblokComponent parent='footer' blok={item} />
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
