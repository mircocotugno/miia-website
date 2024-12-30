import type { SectionProps } from '@props/types'
import { tv } from 'tailwind-variants'
import { Heading } from '@components/heading'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import type { PropsWithChildren } from 'react'

interface SectionComponent {
  blok: SectionProps
  parent?: string
}

export function Section({ blok, parent }: SectionComponent) {
  const sectionClasses = tv({
    base: 'py-6 lg:py-12 space-y-4 bg-background text-foreground',
    variants: {
      themeDark: {
        true: 'bg-forenground text-background',
      },
    },
  })
  const containerClasses = tv({
    base: 'flex items-center px-6 mx-auto max-w-[1280px] min-h-inherit',
    variants: {
      justifyCenter: {
        true: 'justify-items-center text-center',
      },
    },
  })
  const Container = ({ children }: PropsWithChildren) =>
    parent === 'page' ? (
      <div
        className={containerClasses({
          justifyCenter: blok.styles.includes('justifyCenter'),
        })}
      >
        {children}
      </div>
    ) : (
      children
    )

  return (
    <section
      className={sectionClasses({
        themeDark: blok.styles.includes('themeDark'),
      })}
      {...storyblokEditable(blok)}
    >
      <Container>
        {blok.headline && (
          <div className='max-w-screen-md'>
            <Heading blok={{ body: blok.headline }} parent={blok.component} />
          </div>
        )}
        {blok.body && (
          <div
            className={`flex gap-6 flex-wrap ${blok.styles.includes('justifyCenter') ? 'justify-items-center text-center' : ''}`}
          >
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
      </Container>
    </section>
  )
}
