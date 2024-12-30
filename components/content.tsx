import type { ContentProps } from '@props/types'
import { compiler } from 'markdown-to-jsx'
import { Link, Image } from '@nextui-org/react'
// import Image from 'next/image'
import { storyblokEditable } from '@storyblok/react'

interface ContentComponent {
  blok: ContentProps
  parent?: string
}

export function Content({ blok }: ContentComponent) {
  return (
    <div
      className='w-full h-full space-y-1.5 backdrop-blur-sm'
      {...storyblokEditable(blok)}
    >
      {compiler(blok.head, { wrapper: null, overrides: overrides })}
      <div className='font-sans'>
        {compiler(blok.body, {
          wrapper: null,
          overrides: overrides,
        })}
      </div>
    </div>
  )
}

const overrides = {
  h3: {
    component: ({ children }: { children: string }) => (
      <h3 className='font-bold text-2xl'>{children}</h3>
    ),
  },
  h4: {
    component: ({ children }: { children: string }) => (
      <h4 className='font-semibold text-xl'>{children}</h4>
    ),
  },
  h5: {
    component: ({ children }: { children: string }) => (
      <h5 className='font-semibold text-lg'>{children}</h5>
    ),
  },
  h6: {
    component: ({ children }: { children: string }) => (
      <h6 className='font-semibold'>{children}</h6>
    ),
  },
  ul: {
    component: ({ children }: { children: string }) => (
      <ul className='list-disc list-outside'>{children}</ul>
    ),
  },
  a: {
    component: ({ href, children }: { href: string; children: string }) => (
      <Link color='primary' href={href || ''}>
        {children}
      </Link>
    ),
  },
  code: {
    component: ({ children }: { children: string }) => (
      <i className={`iconoir-${children}`} />
    ),
  },
  img: {
    component: ({
      src,
      alt,
      title,
    }: {
      src: string
      alt: string
      title: string
    }) => <Image src={src} alt={alt} title={title} width='100%' />,
  },
}
