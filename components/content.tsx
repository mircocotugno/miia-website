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
      {compiler(blok.body, {
        wrapper: null,
        forceWrapper: true,
        overrides: overrides,
      })}
    </div>
  )
}

const overrides = {
  h3: {
    component: ({ children }: { children: string }) => (
      <h3 className='font-bold text-4xl max-sm:text-2xl'>{children}</h3>
    ),
  },
  h4: {
    component: ({ children }: { children: string }) => (
      <h4 className='font-semibold text-3xl max-sm:text-xl'>{children}</h4>
    ),
  },
  ul: {
    component: ({ children }: { children: string }) => (
      <ul className='list-disc list-outside'>{children}</ul>
    ),
  },
  a: {
    component: ({ href, children }: { href: string; children: string }) => (
      <Link href={href || ''}>{children}</Link>
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
  p: {
    component: ({ children }: { children: string }) => (
      <p className='max-sm:line-clamp-3'>{children}</p>
    ),
  },
}
