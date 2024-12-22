import { Avatar, Link, Button } from '@nextui-org/react'
import { compiler } from 'markdown-to-jsx'
import type { ActionProps } from '@props/types'
import type { ReactElement } from 'react'

interface ActionComponent {
  blok: ActionProps
}

type ImgMarkdown = {
  src: string
  alt: string
  title: string
}

export function Action({ blok }: ActionComponent) {
  const link: string = blok.link.cached_url || blok.link.url

  const overrides = {
    a: {
      component: ({ children, href }: any) =>
        !link ? (
          <Button href={href} color='primary' size='lg' as={Link}>
            {children}
          </Button>
        ) : (
          children
        ),
    },
    img: {
      component: ({ alt, src, title }: any) => (
        <Avatar className='w-20 h-20 text-large' src={src} name={title} />
      ),
    },
  }

  return compiler(blok.label, {
    wrapper: (props) =>
      link ? (
        <Link href={link} target={blok.link.target}>
          {props.children}
        </Link>
      ) : null,
    forceWrapper: true,
    overrides,
  })
}
