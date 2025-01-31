import type { EventProps } from '@props/types'
import type { PropsWithChildren } from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { getLongDate } from '@modules/formats'
import Link from 'next/link'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'

interface EventComponent {
  blok: EventProps
}

export function Event({ blok }: EventComponent) {
  const link = blok.page.cached_url || blok.page.url

  const Container = ({ children }: PropsWithChildren) =>
    link ? <Link href={link}>{children}</Link> : children

  return (
    <Container>
      <Card>
        <CardHeader className='flex-col items-start'>
          <h4 className='font-bold leading-snug text-2xl'>{blok.title}</h4>
        </CardHeader>
        <CardBody className='text-sm space-y-1'>
          {blok.description &&
            compiler(blok.description, {
              wrapper: null,
              overrides: Typography,
            })}
          {blok.date && (
            <p className='space-x-0.5'>
              <i className='iconoir-calendar-arrow-up pr-1' />
              <span className='md:max-lg:hidden'>Data</span>
              <span>
                {blok.date ? getLongDate(blok.date) : 'in programmazione'}
              </span>
            </p>
          )}
        </CardBody>
      </Card>
    </Container>
  )
}
