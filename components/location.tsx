import type { LocationProps } from '@props/types'
import type { PropsWithChildren } from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import Link from 'next/link'

interface LocationComponent {
  blok: LocationProps
}

export function Location({ blok }: LocationComponent) {
  const Container = ({ children }: PropsWithChildren) =>
    blok.direction ? <Link href={blok.direction}>{children}</Link> : children

  return (
    <Container>
      <div className=''>
        <h4 className='font-bold leading-snug text-2xl'>{blok.title}</h4>
        <p className='text-sm'>{blok.address}</p>
      </div>
    </Container>
  )
}
