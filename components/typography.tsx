import { Link, Image } from '@nextui-org/react'

export const Typography = {
  h1: {
    component: ({ children }: { children: string }) => (
      <h1 className='font-serif leading-compact font-black text-7xl max-sm:text-6xl'>
        {children}
      </h1>
    ),
  },
  h2: {
    component: ({ children }: { children: string }) => (
      <h2 className='font-serif leading-compact font-extrabold text-5xl max-sm:text-4xl'>{children}</h2>
    ),
  },
  h3: {
    component: ({ children }: { children: string }) => (
      <h3 className='font-serif leading-compact font-bold text-4xl max-sm:text-3xl break-words'>{children}</h3>
    ),
  },
  h4: {
    component: ({ children }: { children: string }) => (
      <h4 className='font-bold leading-none text-2xl'>{children}</h4>
    ),
  },
  h5: {
    component: ({ children }: { children: string }) => (
      <h5 className='font-semibold text-xl'>{children}</h5>
    ),
  },
  h6: {
    component: ({ children }: { children: string }) => (
      <h6 className='font-semibold text-lg'>{children}</h6>
    ),
  },
  code: {
    component: ({ children }: { children: string }) => (
      <i className={`iconoir-${children} font-inherit`} />
    ),
  },
  a: {
    component: ({ href, children }: { href: string; children: string }) => (
      <Link href={href || ''}>{children}</Link>
    ),
  },
  p: {
    component: ({ children }: { children: string }) => (
      <p className='font-sans leading-tight max-sm:line-clamp-3'>{children}</p>
    ),
  },
  ul: {
    component: ({ children }: { children: string }) => (
      <ul className='list-disc list-outside'>{children}</ul>
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
    }) => <Image removeWrapper src={src} alt={alt} title={title} width='100%' />,
  },
}
