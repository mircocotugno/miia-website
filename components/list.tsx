import type { ListProps, TextProps } from '@props/types'
import { storyblokEditable } from '@storyblok/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from '@components/typography'
import { tv } from 'tailwind-variants'
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
    <div className='flex-0' {...storyblokEditable(blok)}>
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

function ListProcess(blok: ListProps) {
  const items = blok.items.filter(
    (item): item is TextProps => item.component === 'text'
  )

  const processClasses = tv({
    base: 'flex flex-col items-center justify-center sm:px-3 lg:px-6 -space-y-1 sm:-space-y-16',
  })

  const stepClasses = tv({
    base: 'w-full sm:w-1/2 flex border-2 border-transparent border-l-neutral-500',
    variants: {
      justify: {
        left: 'sm:self-start sm:justify-end sm:translate-x-px sm:border-r-neutral-500 sm:border-l-transparent',
        right:
          'sm:self-end sm:justify-start sm:-translate-x-px sm:border-l-neutral-500 sm:border-r-none',
      },
    },
  })
  const cardClasses = tv({
    base: 'pl-8 pb-2',
    variants: {
      justify: {
        left: 'sm:pl-8 sm:text-left',
        right: 'sm:pr-8 sm:text-right',
      },
    },
  })
  return (
    <>
      <h4 className='font-bold text-2xl' >{blok.label}</h4>
      <div className={processClasses()} {...storyblokEditable(blok)}>
        {items.map((item, index) => (
          <div
            className={stepClasses({ justify: index % 2 ? 'right' : 'left' })}
            {...storyblokEditable(item)}
          >
            <div
              className={cardClasses({ justify: index % 2 ? 'left' : 'right' })}
              key={index}
            >
              <h6 className='font-black font-serif text-5xl mb-3 leading-none'>
                {index + 1}
              </h6>
              {item.title &&
                compiler(item.title, {
                  wrapper: null,
                  overrides: Typography,
                })}
              {item.description &&
                compiler(item.description, {
                  wrapper: null,
                  overrides: Typography,
                })}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
