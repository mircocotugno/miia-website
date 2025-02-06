import type { ListProps, TextProps } from '@props/types'
import { storyblokEditable } from '@storyblok/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from '@components/typography'
import {
  Accordion,
  AccordionItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
} from '@nextui-org/react'
import { StoryblokComponent } from '@storyblok/react'

interface ListComponent {
  blok: ListProps
}

const displayModes = {
  dropdown: ListDropdown,
  tab: ListTab,
  accordion: ListAccordion,
  timeline: ListTimeline,
  process: ListProcess,
}

const displayFilters = {
  dropdown: 'action',
  tab: 'action',
  accordion: 'text',
  timeline: 'event',
  process: 'text',
}

export function List({ blok }: ListComponent) {
  if (blok.display) {
    const ListFilter = displayFilters[blok.display]
    const ListDisplay = displayModes[blok.display]
    blok.items = blok.items.filter(({ component }) => component === ListFilter)
    return <ListDisplay {...blok} />
  }
  return (
    <div className='flex-0'>
      <p className='text-lg font-medium mb-2'>{blok.label}</p>
      <hr className='opacity-10 mb-4' />
      <ul className='space-y-2'>
        {blok.items.map((item, index) => (
          <li key={`list-${index}`}>
            <StoryblokComponent blok={item} size='sm' />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ListDropdown(blok: ListProps) {
  return (
    <Dropdown {...storyblokEditable(blok)}>
      <DropdownTrigger>
        <Link color='foreground'>{blok.label}</Link>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={blok.id}
        classNames={{
          base: 'bg-background/70 backdrop-blur-lg',
          list: 'shadow-none',
        }}
      >
        {blok.items.map((item, index) => (
          <DropdownItem key={`dropdown-${index}`}>
            <StoryblokComponent blok={item} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

function ListTab(blok: ListProps) {
  return (
    <div {...storyblokEditable(blok)} className='col-span-12 flex gap-2'>
      {blok.items.map((item, index) => (
        <StoryblokComponent blok={item} key={index} theme='default' size='sm' />
      ))}
    </div>
  )
}

function ListAccordion(blok: ListProps) {
  const items = blok.items.filter(
    (item): item is TextProps => item.component === 'text'
  )
  return (
    <Accordion className='col-span-12' {...storyblokEditable(blok)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          aria-label={`accordion-${index}`}
          title={compiler(item.title, {
            wrapper: null,
            overrides: Typography,
          })}
        >
          <div className='font-light'>
            {compiler(item.description, {
              wrapper: null,
              overrides: Typography,
            })}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function ListTimeline(blok: any) {
  return <div className=''></div>
}

function ListProcess(blok: any) {
  return <div className=''></div>
}
