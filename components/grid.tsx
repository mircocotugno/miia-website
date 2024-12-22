import { GridProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

interface GridComponent {
  blok: GridProps
  parent?: string
}

export function Grid({ blok }: GridComponent) {
  // console.log(blok.items)

  return (
    <div
      className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6'
      {...storyblokEditable(blok)}
    >
      {!!blok.items.length &&
        blok.items.map((item, index) => (
          <StoryblokComponent blok={item.content} key={index} />
        ))}
    </div>
  )
}
