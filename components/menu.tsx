import { MenuProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
} from '@heroui/react'

interface MenuComponent {
  blok: MenuProps
  parent?: string
}

export default function Menu({ blok, parent }: MenuComponent) {
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
      <div {...storyblokEditable(blok)} className='flex gap-2'>
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
