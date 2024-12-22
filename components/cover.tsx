import type { CSSProperties } from 'react'
import type { CoverProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

interface CoverComponent {
  blok: CoverProps
  parent?: string
}

export function Cover({ blok }: CoverComponent) {
  const sectionClasses = ['py-6', 'lg:py-12']
  const sectionStyles: CSSProperties = {}
  if (blok.background?.filename) {
    sectionStyles.backgroundImage = `url(${blok.background.filename})`
    sectionClasses.push('bg-cover')
  }

  return (
    <section
      className={sectionClasses.join(' ')}
      style={sectionStyles}
      {...storyblokEditable(blok)}
    >
      <div className='flex px-6 mx-auto max-w-[1024px]'>
        <div className='flex-none space-x-2 lg:w-1/2 w-2/3 max-sm:w-full my-6 lg:my-12 space-y-6'>
          {!!blok.body.length &&
            blok.body.map((body, index) => (
              <StoryblokComponent
                blok={body}
                parent={blok.component}
                key={index}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
