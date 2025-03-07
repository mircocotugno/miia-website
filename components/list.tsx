import type { ListProps } from '@props/types'
import { storyblokEditable } from '@storyblok/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from '@components/typography'
import { Accordion, AccordionItem } from '@heroui/react'
import { tv } from 'tailwind-variants'

interface ListComponent {
  blok: ListProps
}

const classes = tv({
  base: 'col-span-12 gap-4',
  variants: {
    size: {
      '1/4': 'md:col-span-3',
      '1/3': 'sm:col-span-4',
      '1/2': 'sm:col-span-6',
      '2/3': 'sm:col-span-8',
      '3/4': 'sm:col-span-9',
    },
  },
})

export default function List({ blok }: ListComponent) {
  const typography = {}
  return (
    <Accordion
      className={classes({ size: blok.size })}
      {...storyblokEditable(blok)}
    >
      {blok.items.map((item, index) => (
        <AccordionItem
          key={`accordion-${index}`}
          aria-label={`accordion-${index}`}
          title={compiler(item.title, {
            wrapper: null,
            overrides: Typography({}),
          })}
        >
          <div className='font-light'>
            {compiler(item.description, {
              wrapper: null,
              overrides: Typography({}),
            })}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

// function ListTab(blok: ListProps) {
//   const items = blok.items.filter(
//     (item): item is ActionProps => item.component === 'action'
//   )
//   return (
//     <div {...storyblokEditable(blok)} className='col-span-12 flex gap-2'>
//       {blok.items.map((item, index) => (
//         <StoryblokComponent
//           blok={item}
//           key={`tab-${index}`}
//           theme='default'
//           size='sm'
//         />
//       ))}
//     </div>
//   )
// }
