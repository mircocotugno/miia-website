import type { CourseProps } from '@props/types'
import type { PropsWithChildren } from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { getLongDate, getShortDate } from '@modules/formats'
import Link from 'next/link'

interface CourseComponent {
  blok: CourseProps
}

export function Course({ blok }: CourseComponent) {
  const link = blok.page.cached_url || blok.page.url

  const Container = ({ children }: PropsWithChildren) =>
    link ? <Link href={link}>{children}</Link> : children

  return (
    <Container>
      <Card>
        <CardHeader className='flex-col items-start'>
          <h4 className='font-bold leading-snug text-2xl'>{blok.title}</h4>
          <small>
            {blok.hours.includes('20:00/23:00')
              ? 'Frequenza serale'
              : 'Frequenza al sabato'}
          </small>
        </CardHeader>
        <CardBody>
          <ul className='text-sm space-y-1'>
            <li className='space-x-0.5'>
              <i className='iconoir-calendar pr-1' />
              <span className='md:max-lg:hidden'>lezioni:</span>
              <span>{blok.days.join(', ')}</span>
            </li>
            <li className='space-x-0.5'>
              <i className='iconoir-clock pr-1' />
              <span className='md:max-lg:hidden'>orari:</span>
              <span>{blok.hours.join(', ')}</span>
            </li>
            <li className='space-x-0.5'>
              <i className='iconoir-calendar-arrow-up pr-1' />
              <span className='md:max-lg:hidden'>inizio:</span>
              <span>
                {blok.starts ? getLongDate(blok.starts) : 'in programmazione'}
              </span>
            </li>
            {blok.ends && (
              <li className='space-x-0.5'>
                <i className='iconoir-calendar-arrow-down pr-1' />
                <span className='md:max-lg:hidden'>inizio:</span>
                {getShortDate(blok.ends)}
              </li>
            )}
            <li className='space-x-0.5'>
              <i className='iconoir-group pr-1' />
              <span className='md:max-lg:hidden'>posti:</span>
              <span>{blok.seats}</span>
            </li>
          </ul>
        </CardBody>
      </Card>
    </Container>
  )
}
