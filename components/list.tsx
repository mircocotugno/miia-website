import type {
  ActionProps,
  ListProps,
  TextProps,
  WrapperProps,
} from '@props/types'
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

export function List({ blok }: ListComponent) {
  if (blok.display) {
    const ListDisplay = displayModes[blok.display]
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
  const items = blok.items.filter(
    (item): item is ActionProps => item.component === 'action'
  )
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
        {items.map((item, index) => (
          <DropdownItem key={`dropdown-${index}`}>
            <StoryblokComponent blok={item} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

function ListTab(blok: ListProps) {
  const items = blok.items.filter(
    (item): item is ActionProps => item.component === 'action'
  )
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
    (item): item is WrapperProps => item.component === 'wrapper'
  )

  const processClasses = tv({
    base: 'relative flex flex-col items-center justify-center -space-y-4 sm:-space-y-8 sm:px-3 lg:px-6',
  })

  const stepClasses = tv({
    base: 'relative w-full sm:w-1/2 flex border-2 border-transparent border-l-neutral-500',
    variants: {
      justify: {
        left: 'sm:self-start sm:justify-end sm:translate-x-px sm:border-r-neutral-500 sm:border-l-transparent',
        right:
          'sm:self-end sm:justify-start sm:-translate-x-px sm:border-l-neutral-500 sm:border-r-none',
      },
    },
  })

  const indexClasses = tv({
    base: 'font-serif font-black text-5xl leading-snug',
    variants: {
      justify: {
        left: 'sm:text-right',
        right: '',
      },
    },
  })

  const dotClasses = tv({
    base: 'w-3 h-3 absolute top-1/2 rounded-full bg-neutral-500 border-2 border-background z-10 -left-px -translate-x-1/2 ',
    variants: {
      justify: {
        left: 'sm:left-auto sm:-right-px sm:translate-x-1/2',
        right: '',
      },
    },
  })

  return (
    <>
      <h4 className='font-bold text-2xl'>{blok.label}</h4>
      <div className={processClasses()} {...storyblokEditable(blok)}>
        {/* <div className='w-2 h-2 absolute -top-2 left-px sm:left-1/2 -translate-x-1/2 rounded-full bg-neutral-500' /> */}
        {items.map((item, index) => {
          const justify = index % 2 ? 'right' : 'left'
          return (
            <div
              className={stepClasses({ justify: justify })}
              {...storyblokEditable(item)}
            >
              <div
                className={dotClasses({
                  justify: justify,
                })}
              />
              <div className='space-y-2 p-4' key={index}>
                <h6 className={indexClasses({ justify: justify })}>
                  {index + 1}
                </h6>
                {item.contents.map((content, index) => (
                  <StoryblokComponent blok={content} key={index} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
