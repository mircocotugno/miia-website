import type { AccordionProps } from '@props/types'
import {
  Accordion as NextAccordion,
  AccordionItem,
  Link,
  Image,
} from '@nextui-org/react'
import { compiler } from 'markdown-to-jsx'

interface AccordionComponent {
  blok: AccordionProps
}

export function Accordion({ blok }: AccordionComponent) {
  return (
    <NextAccordion>
      {blok.contents.map((content, index) => (
        <AccordionItem
          key={index}
          aria-label={`accordion-${index}`}
          title={compiler(content.head, {
            wrapper: null,
            overrides: overrides,
          })}
        >
          <div className='font-light'>
            {compiler(content.body, { wrapper: null, overrides: overrides })}
          </div>
        </AccordionItem>
      ))}
    </NextAccordion>
  )
}

const overrides = {
  h3: {
    component: ({ children }: { children: string }) => (
      <h3 className='font-medium text-xl max-sm:text-lg'>{children}</h3>
    ),
  },
  h4: {
    component: ({ children }: { children: string }) => (
      <h4 className='font-semibold text-lg max-sm:text-md'>{children}</h4>
    ),
  },
  ul: {
    component: ({ children }: { children: string }) => (
      <ul className='list-disc list-outside'>{children}</ul>
    ),
  },
  a: {
    component: ({ href, children }: { href: string; children: string }) => (
      <Link color='primary' href={href || ''} className='font-semibold'>
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
