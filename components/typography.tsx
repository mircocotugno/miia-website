import { Image } from '@heroui/react'
import Link from 'next/link'
import { tv } from 'tailwind-variants'

interface TypographyComponents {
  theme?: 'primary' | 'secondary' | 'light' | 'dark'
  size?: 'small' | 'large'
  error?: boolean
}

export const Typography = ({ theme, size, error }: TypographyComponents) => {
  const { title, subtitle, text, list, link } = classes()
  return {
    h1: {
      component: ({ children }: { children: string }) => (
        <h1
          className={title({
            class:
              'text-5xl md:text-6xl xl:text-7xl font-black leading-tight md:leading-tight xl:leading-none',
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
          className={title({
            class:
              'text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight md:leading-tight xl:leading-none',
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
          className={title({
            class:
              'text-3xl md:text-4xl xl:text-5xl font-bold leading-tight md:leading-tight xl:leading-none',
            theme: theme,
          })}
        >
          {children}
        </h3>
      ),
    },
    h4: {
      component: ({ children }: { children: string }) => (
        <h4
          className={subtitle({
            class:
              'text-xl md:text-2xl xl:text-3xl font-bold leading-snug md:leading-snug xl:leading-snug',
            theme: theme,
          })}
        >
          {children}
        </h4>
      ),
    },
    h5: {
      component: ({ children }: { children: string }) => (
        <h5
          className={subtitle({
            class:
              'font-semibold text-lg md:text-xl leading-snug md:leading-snug xl:leading-snug',
            theme: theme,
          })}
        >
          {children}
        </h5>
      ),
    },
    h6: {
      component: ({ children }: { children: string }) => (
        <h6
          className={subtitle({
            class:
              'text-lg font-semibold leading-snug md:leading-snug xl:leading-snug',
            theme: theme,
          })}
        >
          {children}
        </h6>
      ),
    },
    code: {
      component: ({ children }: { children: string }) => (
        <i
          className={`iconoir-${children} text-icon align-middle inline-block`}
        />
      ),
    },
    strong: {
      component: ({ children }: { children: string }) => (
        <strong className={text({ class: 'font-semibold', theme: theme })}>
          {children}
        </strong>
      ),
    },
    a: {
      component: ({ href, children }: { href: string; children: string }) => (
        <Link className={link({ theme: theme })} href={href || ''}>
          {children}
        </Link>
      ),
    },
    p: {
      component: ({ children }: { children: string }) => (
        <p className={text({ error: error, theme: theme, size: size })}>
          {children}
        </p>
      ),
    },
    ul: {
      component: ({ children }: { children: string }) => (
        <ul className={list({ theme: theme })}>{children}</ul>
      ),
    },
    hr: {
      component: () => <hr className="max-w-1/3" />,
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
        <Image removeWrapper src={src} alt={alt} title={title} width="100%" />
      ),
    },
  }
}

const classes = tv({
  slots: {
    title: 'font-serif break-words',
    subtitle: 'font-sans',
    text: 'font-sans',
    list: 'list-disc list-outside',
    link: 'text-md opacity-90 hover:opacity-100 hover:underline',
  },
  variants: {
    theme: {
      primary: {
        title: 'text-primary',
        subtitle: 'text-primary',
        text: 'text-primary',
        list: 'text-primary',
        link: 'text-primary',
      },
      secondary: {
        title: 'text-secondary',
        subtitle: 'text-secondary',
        text: 'text-secondary',
        list: 'text-secondary',
        link: 'text-secondary',
      },
      light: {
        title: 'text-white',
        subtitle: 'text-neutral-100',
        text: 'text-neutral-300',
        list: 'text-neutral-300',
        link: 'text-neutral-100',
      },
      dark: {
        title: 'text-neutral-950',
        subtitle: 'text-neutral-900',
        text: 'text-neutral-700',
        list: 'text-neutral-700',
        link: 'text-neutral-900',
      },
    },
    error: {
      true: {
        text: 'text-danger',
      },
    },
    size: {
      small: {
        text: 'text-sm',
      },
      large: {
        text: 'text-xl',
      },
    },
  },
})
