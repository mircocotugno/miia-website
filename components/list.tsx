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
} from '@heroui/react'
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

function ListTimeline(blok: ListProps) {
  const items = blok.items.filter(
    (item): item is WrapperProps => item.component === 'wrapper'
  )
  const timelineClasses = tv({
    base: 'relative flex flex-col items-center justify-center -space-y-4 sm:-space-y-8',
  })

  const stepClasses = tv({
    base: 'relative w-full sm:w-1/2 border-2 border-transparent border-l-neutral-500',
    variants: {
      justify: {
        left: 'pr-4 sm:self-start sm:translate-x-px sm:border-r-neutral-500 sm:border-l-transparent',
        right:
          'pl-4 sm:self-end sm:-translate-x-px sm:border-l-neutral-500 sm:border-r-none',
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
      <div className={timelineClasses()} {...storyblokEditable(blok)}>
        {items.map((item, index) => {
          const justify = index % 2 ? 'right' : 'left'
          return (
            <div
              className={stepClasses({ justify: justify })}
              {...storyblokEditable(item)}
              key={index}
            >
              <div className={dotClasses({ justify: justify })} />
              {item.contents.map((content, index) => (
                <StoryblokComponent blok={content} key={index} />
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}

function ListProcess(blok: ListProps) {
  const items = blok.items.filter(
    (item): item is WrapperProps => item.component === 'wrapper'
  )

  const processClasses = tv({
    base: 'relative flex flex-wrap items-baseline gap-2',
  })

  const stepClasses = tv({
    base: 'relative flex-0 w-full sm:flex-1 sm:min-w-24 md:min-w-32 lg:min-w-48 group',
  })

  const indexClasses = tv({
    base: 'font-serif font-black text-5xl leading-snug',
  })

  const arrowClasses = tv({
    base: 'self-center justify-self-center rotate-90 sm:rotate-0 iconoir-arrow-right text-2xl',
  })

  return (
    <>
      <h4 className='font-bold text-2xl'>{blok.label}</h4>
      <div className={processClasses()} {...storyblokEditable(blok)}>
        {/* <div className='w-2 h-2 absolute -top-2 left-px sm:left-1/2 -translate-x-1/2 rounded-full bg-neutral-500' /> */}
        {items.map((item, index) => {
          const justify = index % 2 ? 'right' : 'left'
          return (
            <>
              {!!index && <i className={arrowClasses()} />}
              <div
                className={stepClasses()}
                {...storyblokEditable(item)}
                key={index}
              >
                <h6 className={indexClasses()}>{index + 1}</h6>
                {item.contents.map((content, index) => (
                  <StoryblokComponent blok={content} key={index} />
                ))}
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}
