import type { AccordionProps } from '@props/types'
import { Accordion as NextAccordion, AccordionItem } from '@nextui-org/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from '@components/typography'
import { storyblokEditable } from '@storyblok/react'
import { Column } from '@components/column'

interface AccordionComponent {
  blok: AccordionProps
  parent?: string
}

export function Accordion({ blok, parent }: AccordionComponent) {
  return (
    <Column parent={parent} classes='flex-1 max-sm:min-w-full min-w-60'>
      <NextAccordion {...storyblokEditable(blok)}>
        {blok.contents.map((content, index) => (
          <AccordionItem
            key={index}
            aria-label={`accordion-${index}`}
            title={compiler(content.head, {
              wrapper: null,
              overrides: Typography,
            })}
          >
            <div className='font-light'>
              {compiler(content.body, { wrapper: null, overrides: Typography })}
            </div>
          </AccordionItem>
        ))}
      </NextAccordion>
    </Column>
  )
}
