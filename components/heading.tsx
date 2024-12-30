import type { HeadingProps } from '@props/types'
import { Link } from '@nextui-org/react'
import { compiler } from 'markdown-to-jsx'

interface HeadingComponent {
  blok: HeadingProps
  parent?: string
}

export function Heading({ blok }: HeadingComponent) {
  return (
    <div className='font-serif space-y-3 backdrop-blur-sm break-words'>
      {compiler(blok.body, {
        wrapper: null,
        forceWrapper: true,
        overrides: overrides,
      })}
    </div>
  )
}

const overrides = {
  h1: {
    component: ({ children }: { children: string }) => (
      <h1 className='text-primary font-black text-7xl max-sm:text-6xl'>
        {children}
      </h1>
    ),
  },
  h2: {
    component: ({ children }: { children: string }) => (
      <h2 className='font-extrabold text-5xl max-sm:text-4xl'>{children}</h2>
    ),
  },
  h3: {
    component: ({ children }: { children: string }) => (
      <h3 className='font-bold text-4xl max-sm:text-3xl'>{children}</h3>
    ),
  },
  h4: {
    component: ({ children }: { children: string }) => (
      <h4 className='font-bold text-3xl max-sm:text-2xl'>{children}</h4>
    ),
  },
  code: {
    component: ({ children }: { children: string }) => (
      <i className={`iconoir-${children}`} />
    ),
  },
  a: {
    component: ({ href, children }: { href: string; children: string }) => (
      <Link href={href || ''}>{children}</Link>
    ),
  },
  p: {
    component: ({ children }: { children: string }) => (
      <p className='font-sans text-lg max-sm:line-clamp-3'>{children}</p>
    ),
  },
}
