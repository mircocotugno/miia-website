import type { LocationProps } from '@props/types'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'
import Link from 'next/link'
import { storyblokEditable } from '@storyblok/react'

interface LocationComponent {
  blok: LocationProps
}

export default function Location({ blok }: LocationComponent) {
  const location = blok.ref?.content || blok
  if (!location.title || !location.address) return null

  const classes = tv({
    base: 'col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3',
  })

  const Container = ({ children }: PropsWithChildren) =>
    location.direction ? (
      <Link
        className={classes()}
        href={location.direction}
        {...storyblokEditable(blok)}
      >
        {children}
      </Link>
    ) : (
      <div className={classes()} {...storyblokEditable(blok)}>
        {children}
      </div>
    )

  return (
    <Container>
      <h5 className='font-semibold leading-snug text-xl'>{location.title}</h5>
      <p className='text-sm'>{location.address}</p>
    </Container>
  )
}
