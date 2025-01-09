import { GridProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { Column } from '@components/column'
import { tv } from 'tailwind-variants'

interface GridComponent {
  blok: GridProps
  parent?: string
}

export function Grid({ blok, parent }: GridComponent) {
  console.log(blok.items)
  const gridClasses = tv({
    base: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6',
    variants: {
      doubleWidth: {
        true: 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12',
      },
    },
  })

  return (
    <Column parent={parent} classes='flex-1 max-sm:min-w-full min-w-60'>
      <div
        className={gridClasses({
          doubleWidth: blok.styles?.includes('doubleWidth'),
        })}
        {...storyblokEditable(blok)}
      >
        {!!blok.items.length &&
          blok.items.map((item, index) => (
            <StoryblokComponent
              blok={item.content}
              article={item}
              parent='grid'
              key={index}
            />
          ))}
      </div>
    </Column>
  )
}
