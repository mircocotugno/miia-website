import { Link, Image } from '@heroui/react'
import { tv } from 'tailwind-variants'

interface TypographyComponents {
  theme?: 'primary' | 'secondary'
  size?: 'small' | 'large'
  error?: boolean
}

export const Typography = ({ theme, size, error }: TypographyComponents) => ({
  h1: {
    component: ({ children }: { children: string }) => (
      <h1
        className={titleClasses({
          class:
            'text-5xl leading-tight md:text-6xl md:leading-tight xl:text-7xl xl:leading-none font-serif font-black break-words',
          theme: theme,
        })}
      >
        {children}
      </h1>
    ),
  },
  h2: {
    component: ({ children }: { children: string }) => (
      <h2
        className={titleClasses({
          class:
            'text-4xl leading-tight md:text-5xl md:leading-tight xl:text-6xl xl:leading-none font-serif font-extrabold break-words',
          theme: theme,
        })}
      >
        {children}
      </h2>
    ),
  },
  h3: {
    component: ({ children }: { children: string }) => (
      <h3
        className={titleClasses({
          class:
            'text-3xl leading-tight md:text-4xl md:leading-tight xl:text-5xl xl:leading-none font-serif font-bold break-words',
          theme: theme,
        })}
      >
        {children}
      </h3>
    ),
  },
  h4: {
    component: ({ children }: { children: string }) => (
      <h4 className='font-bold text-xl leading-snug md:text-2xl md:leading-snug xl:text-3xl xl:leading-snug'>
        {children}
      </h4>
    ),
  },
  h5: {
    component: ({ children }: { children: string }) => (
      <h5 className='font-semibold text-lg leading-snug md:text-xl md:leading-snug xl:text-2xl xl:leading-snug'>
        {children}
      </h5>
    ),
  },
  h6: {
    component: ({ children }: { children: string }) => (
      <h6 className='font-semibold text-lg leading-snug xl:text-xl xl:leading-snug'>
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
      <p className={paragraphClasses({ error: error, size: size })}>
        {children}
      </p>
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
})

const titleClasses = tv({
  variants: {
    theme: {
      primary: 'text-primary',
      secondary: 'text-secondary',
    },
  },
})

const paragraphClasses = tv({
  base: 'font-sans',
  variants: {
    error: { true: 'text-small text-dander' },
    size: {
      small: 'text-sm',
      large: 'text-xl',
    },
  },
})
