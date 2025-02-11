import type { LocationProps } from '@props/types'
import type { PropsWithChildren } from 'react'
import { Card, CardBody, CardHeader } from '@heroui/react'
import Link from 'next/link'
import { storyblokEditable } from '@storyblok/react'

interface LocationComponent {
  blok: LocationProps
}

export function Location({ blok }: LocationComponent) {
  const location = blok.ref?.content || blok
  if (!location.title || !location.address) return null

  const Container = ({ children }: PropsWithChildren) =>
    location.direction ? (
      <Link href={location.direction}>{children}</Link>
    ) : (
      children
    )

  return (
    <Container>
      <div className='' {...storyblokEditable(blok)}>
        <h5 className='font-semibold leading-snug text-xl'>{location.title}</h5>
        <p className='text-sm'>{location.address}</p>
      </div>
    </Container>
  )
}
