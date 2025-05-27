import type { CourseProps } from '@props/types'
import type { PropsWithChildren } from 'react'
import { Card, CardBody, CardHeader } from '@heroui/react'
import { getLongDate, getShortDate } from '@modules/formats'
import Link from 'next/link'

interface CourseComponent {
  blok: CourseProps
  parent?: string
}

export default function Course({ blok, parent }: CourseComponent) {
  const course = blok.alias?.content || blok
  if (!course.title || !course.days || !course.hours) return null

  const Container = ({ children }: PropsWithChildren) =>
    parent && ['section', 'aside'].includes(parent) ? (
      <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
        {children}
      </div>
    ) : (
      children
    )

  const link = course.page?.cached_url || course.page?.url
  const Wrapper = ({ children }: PropsWithChildren) =>
    link ? <Link href={link}>{children}</Link> : children

  return (
    <Container>
      <Wrapper>
        <Card>
          <CardHeader className='flex-col items-start'>
            <h4 className='font-bold leading-snug text-2xl'>{course.title}</h4>
            <small>
              {course.hours.includes('20:00/23:00')
                ? 'Frequenza serale'
                : 'Frequenza al sabato'}
            </small>
          </CardHeader>
          <CardBody>
            <ul className='text-sm space-y-1'>
              <li className='space-x-0.5'>
                <i className='iconoir-calendar pr-1' />
                <span className='md:max-lg:hidden'>lezioni:</span>
                <span>{course.days.join(', ')}</span>
              </li>
              <li className='space-x-0.5'>
                <i className='iconoir-clock pr-1' />
                <span className='md:max-lg:hidden'>orari:</span>
                <span>{course.hours.join(', ')}</span>
              </li>
              <li className='space-x-0.5'>
                <i className='iconoir-calendar-arrow-up pr-1' />
                <span className='md:max-lg:hidden'>inizio:</span>
                <span>
                  {blok.starts ? getLongDate(blok.starts) : 'in programmazione'}
                </span>
              </li>
              {course.ends && (
                <li className='space-x-0.5'>
                  <i className='iconoir-calendar-arrow-down pr-1' />
                  <span className='md:max-lg:hidden'>inizio:</span>
                  {getShortDate(course.ends)}
                </li>
              )}
              {course.seats && (
                <li className='space-x-0.5'>
                  <i className='iconoir-group pr-1' />
                  <span className='md:max-lg:hidden'>posti:</span>
                  <span>{blok.seats}</span>
                </li>
              )}
            </ul>
          </CardBody>
        </Card>
      </Wrapper>
    </Container>
  )
}
