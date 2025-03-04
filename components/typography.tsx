import { Link, Image } from '@heroui/react'

export const Typography = {
  h1: {
    component: (props: { children: string }) => (
      <h1 className='font-serif leading-tight font-black break-words text-5xl md:text-6xl xl:text-7xl'>
        {props.children}
      </h1>
    ),
  },
  h2: {
    component: ({ children }: { children: string }) => (
      <h2 className='font-serif leading-tight font-extrabold break-words text-4xl md:text-5xl xl:text-6xl'>
        {children}
      </h2>
    ),
  },
  h3: {
    component: ({ children }: { children: string }) => (
      <h3 className='font-serif leading-tight font-bold break-words text-3xl md:text-4xl xl:text-5xl'>
        {children}
      </h3>
    ),
  },
  h4: {
    component: ({ children }: { children: string }) => (
      <h4 className='font-bold leading-snug text-xl md:text-2xl xl:text-3xl'>
        {children}
      </h4>
    ),
  },
  h5: {
    component: ({ children }: { children: string }) => (
      <h5 className='font-semibold leading-snug text-lg md:text-xl xl:text-2xl'>
        {children}
      </h5>
    ),
  },
  h6: {
    component: ({ children }: { children: string }) => (
      <h6 className='font-semibold leading-snug text-lg xl:text-xl'>
        {children}
      </h6>
    ),
  },
  code: {
    component: ({ children }: { children: string }) => (
      <i
        className={`iconoir-${children} font-inherit text-icon align-middle inline-block`}
      />
    ),
  },
  strong: {
    component: ({ children }: { children: string }) => (
      <strong className='font-semibold'>{children}</strong>
    ),
  },
  a: {
    component: ({ href, children }: { href: string; children: string }) => (
      <Link
        className='text-md opacity-90 hover:opacity-100 hover:underline'
        href={href || ''}
        color='foreground'
      >
        {children}
      </Link>
    ),
  },
  p: {
    component: ({ children }: { children: string }) => (
      <p className='font-sans max-sm:line-clamp-3'>{children}</p>
    ),
  },
  ul: {
    component: ({ children }: { children: string }) => (
      <ul className='list-disc list-outside'>{children}</ul>
    ),
  },
  hr: {
    component: () => <hr className='max-w-1/3' />,
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
    }) => (
      <Image removeWrapper src={src} alt={alt} title={title} width='100%' />
    ),
  },
}
