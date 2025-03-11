import { MenuProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
} from '@heroui/react'
import { tv } from 'tailwind-variants'

interface MenuComponent {
  blok: MenuProps
  isOpen: boolean
  handleOpen: () => null
  parent?: string
}

export default function Menu({
  blok,
  isOpen,
  handleOpen,
  parent,
}: MenuComponent) {
  if (parent === 'header') {
    const buttonClasses = tv({
      base: 'inline-flex items-center gap-1 font-medium hover:opacity-80 active:opacity-disabled transition-opacity text-foreground text-right',
      variants: {
        isOpen: {
          true: 'opacity-30 hover\:opacity-30',
        },
      },
    })

    const submenuClasses = tv({
      base: 'z-50 overflow-hidden sm:overflow-visible whitespace-nowrap md:absolute top-full md:top-12 left-0 py-0 text-foreground flex flex-col md:flex-row items-end justify-center md:justify-start [&>a]:self-end gap-6 invisible opacity-0 h-0 transition-all duration-150 ease-in-out',
      variants: {
        isOpen: {
          true: 'py-2 md:py-0 visible opacity-100 h-full transition-all duration-250 ease-in-out delay-75',
        },
      },
    })

    return (
      <>
        <button
          className={buttonClasses({ isOpen: isOpen })}
          onClick={() => handleOpen()}
        >
          {blok.title}
          <i className={`iconoir-nav-arrow-${isOpen ? 'down' : 'up'}`} />
        </button>

        <div className={submenuClasses({ isOpen })}>
          {blok.links.map((link, index) => (
            <StoryblokComponent blok={link} size='sm' key={index} />
          ))}
        </div>
      </>
    )
  }
  if (parent === 'footer') {
    return (
      <div className='flex-none' {...storyblokEditable(blok)}>
        <p className='text-lg font-medium mb-2'>{blok.title}</p>
        <hr className='opacity-10 mb-4' />
        <ul className='space-y-2'>
          {blok.links.map((link, index) => (
            <li key={`list-${index}`}>
              <StoryblokComponent blok={link} size='sm' />
            </li>
          ))}
        </ul>
      </div>
    )
  }
  if (blok.inline) {
    return (
      <div
        {...storyblokEditable(blok)}
        className='flex flex-wrap gap-x-2 gap-y-4'
      >
        {blok.links.map((link, index) => (
          <StoryblokComponent
            blok={link}
            key={`tab-${index}`}
            theme='default'
            size='sm'
          />
        ))}
      </div>
    )
  }
  return (
    <Dropdown {...storyblokEditable(blok)}>
      <DropdownTrigger>
        <Link color='foreground'>{blok.title}</Link>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={blok.id}
        classNames={{
          base: 'bg-background/70 backdrop-blur-lg',
          list: 'shadow-none',
        }}
      >
        {blok.links.map((link, index) => (
          <DropdownItem key={`dropdown-${index}`}>
            <StoryblokComponent blok={link} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
