import type { EventProps } from '@props/types'
import type { PropsWithChildren } from 'react'
import { Card, CardBody, CardHeader } from '@heroui/react'
import { getLongDate } from '@modules/formats'
import Link from 'next/link'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

interface EventComponent {
  blok: EventProps
  parent?: string
}

export default function Event({ blok, parent }: EventComponent) {
  const event = blok.ref?.content || blok
  if (!event.title || !event.date) return null

  const link = event.page?.cached_url || event.page?.url
  const Container = ({ children }: PropsWithChildren) =>
    link ? <Link href={link}>{children}</Link> : children

  const date = new Date(event.date)

  const fieldOpenday = {
    id: 'openday',
    value: date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    required: true,
    error: null,
  }

  const prevDate = new Date()
  const nextDate = new Date('February 21, 2025 22:20:00')

  const dateStamp = prevDate > nextDate ? 'data precedente' : 'data successiva'

  if (parent === 'section') {
    return (
      <div
        className='flex flex-col sm:flex-row col-span-12'
        {...storyblokEditable(blok)}
      >
        <div className='flex-1 sm:max-w-24 gap-2 sm:gap-1 flex sm:flex-col sm:justify-center items-baseline sm:items-center sm:px-6 py-2 text-center'>
          <span className='text-xl sm:text-3xl font-bold'>
            {date.toLocaleDateString('it-IT', {
              day: '2-digit',
            })}
          </span>
          <span className='text-xl font-semibold'>
            {date.toLocaleDateString('it-IT', {
              month: 'long',
            })}
          </span>
          <span className='text-lg font-semibold sm:text-xs sm:font-normal'>
            {date.toLocaleDateString('it-IT', {
              year: 'numeric',
            })}
          </span>
        </div>
        <div className='flex-1 space-y-3'>
          <span className='text-5xl'>{dateStamp}</span>
          <h3 className='font-serif leading-tight font-bold break-words text-3xl md:text-4xl xl:text-5xl'>
            {event.title}
          </h3>
          {event.description &&
            compiler(event.description, {
              wrapper: 'p',
              forceWrapper: true,
              overrides: Typography,
            })}
        </div>
      </div>
    )
  }

  return (
    <Container>
      <Card {...storyblokEditable(blok)}>
        <CardHeader className='flex-col items-start'>
          <h4 className='font-bold leading-snug text-2xl'>{event.title}</h4>
        </CardHeader>
        <CardBody className='text-sm space-y-1'>
          {event.description &&
            compiler(event.description, {
              wrapper: 'p',
              forceWrapper: true,
              overrides: Typography,
            })}
          {event.date && (
            <p className='space-x-0.5'>
              <i className='iconoir-calendar-arrow-up pr-1' />
              <span className='md:max-lg:hidden'>Data</span>
              <span>
                {event.date ? getLongDate(event.date) : 'in programmazione'}
              </span>
            </p>
          )}
        </CardBody>
      </Card>
    </Container>
  )
}
