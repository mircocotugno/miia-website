import type { NavProps } from '@props/types'
import { Fragment, useState, useRef } from 'react'
import { tv } from 'tailwind-variants'
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
import { useOnClickOutside } from 'usehooks-ts'

interface NavComponent {
  blok: NavProps
  parent: 'header' | 'footer'
}

const templates = {
  header: Header,
  footer: Footer,
}

export default function Nav({ blok, parent }: NavComponent) {
  const Template = templates[parent]
  return <Template blok={blok} />
}

function Header({ blok }: { blok: NavProps }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(NaN)

  const ref = useRef(null)
  useOnClickOutside(ref, () => setSubMenuOpen(NaN))

  const submenuClasses = tv({
    base: 'hidden md:block absolute top-full left-0 right-0 dark md:bg-background text-foreground border-t-1 border-transparent invisible opacity-0 h-0 transition-all duration-150 ease-in-out',
    variants: {
      isOpen: {
        true: 'md:py-4 visible opacity-100 h-10 transition-all duration-250 ease-in-out delay-75 border-foreground-200',
      },
    },
  })

  return (
    <Navbar
      ref={ref}
      onMenuOpenChange={setIsMenuOpen}
      className='dark bg-background text-foreground'
      classNames={{ wrapper: 'max-w-[1280px] mx-auto static' }}
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
      {!!blok.contents.length && (
        <Fragment>
          <NavbarContent justify='start' className='max-sm:hidden gap-6'>
            {blok.contents.map((item, index) => {
              const isOpen = index === subMenuOpen
              return (
                <NavbarItem key={index} className='relative'>
                  <StoryblokComponent
                    blok={item}
                    parent='header'
                    isOpen={isOpen}
                    handleOpen={() => setSubMenuOpen(isOpen ? NaN : index)}
                  />
                </NavbarItem>
              )
            })}
            <div className={submenuClasses({ isOpen: !isNaN(subMenuOpen) })} />
          </NavbarContent>
          <NavbarContent justify='end' className='sm:hidden'>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            />
          </NavbarContent>

          <NavbarMenu className='p-8 pt-12 gap-10 items-end dark '>
            {blok.contents.map((item, index) => {
              const isOpen = index === subMenuOpen
              return (
                <NavbarMenuItem key={index} className='w-full text-right'>
                  <StoryblokComponent
                    blok={item}
                    parent='header'
                    isOpen={isOpen}
                    handleOpen={() => setSubMenuOpen(isOpen ? NaN : index)}
                  />
                </NavbarMenuItem>
              )
            })}
          </NavbarMenu>
        </Fragment>
      )}
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
        {!!blok.contents.length && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-6 lg:gap-8'>
            {blok.contents.map((item, index) => (
              <div className='flex-1' key={index}>
                <StoryblokComponent parent='footer' blok={item} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='px-6 mx-auto space-y-6 max-w-[1280px] min-h-inherit'>
        <p className='text-xs '>
          {compiler(blok.message, { wrapper: null, overrides: Typography({}) })}
        </p>
      </div>
    </footer>
  )
}
