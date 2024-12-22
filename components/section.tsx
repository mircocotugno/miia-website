import type { SectionProps } from '@props/types'
import { Heading } from '@components/heading'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

interface SectionComponent {
  blok: SectionProps
}

export function Section({ blok }: SectionComponent) {
  return (
    <section className='py-6 lg:py-12' {...storyblokEditable(blok)}>
      <div className='px-6 space-y-6 mx-auto max-w-[1024px]'>
        {blok.headline && (
          <Heading blok={{ body: blok.headline }} parent={blok.component} />
        )}
        {blok.body && (
          <div className='flex gap-6 flex-wrap'>
            {blok.body.map((body, index) => (
              <div className='flex-1 max-sm:min-w-full min-w-60' key={index}>
                <StoryblokComponent blok={body} parent={blok.component} />
              </div>
            ))}
          </div>
        )}
        {!!blok.footer.length && (
          <div className='space-y-2'>
            {blok.footer.map((footer, index) => (
              <StoryblokComponent
                blok={footer}
                parent={blok.component}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
