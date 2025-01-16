import type { SectionProps } from '@props/types'
import { tv } from 'tailwind-variants'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import type { PropsWithChildren } from 'react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from '@components/typography'

interface SectionComponent {
  blok: SectionProps
  parent?: string
}

export function Section({ blok, parent }: SectionComponent) {
  const sectionClasses = tv({
    base: 'py-6 lg:py-12 space-y-8 bg-foreground text-background',
    variants: {
      themeDark: {
        true: 'bg-background text-foreground',
      },
      justifyCenter: {
        true: 'text-center',
      },
      smallSpaces: {
        true: 'py-3 lg:py-6 space-y-4',
      },
    },
  })
  const bodyClasses = tv({
    base: 'flex gap-6 flex-wrap items-center',
    variants: {
      justifyCenter: {
        true: 'justify-items-center text-center',
      },
      smallSpaces: {
        true: 'gap-3',
      },
    },
  })
  const headlineClasses = tv({
    base: 'max-w-screen-md',
    variants: {
      justifyCenter: {
        true: 'mx-auto text-center',
      },
    },
  })
  const Container = ({ children }: PropsWithChildren) =>
    parent === 'page' ? (
      <div className='px-6 mx-auto space-y-6 max-w-[1280px] min-h-inherit'>
        {children}
      </div>
    ) : (
      children
    )

  return (
    <section
      className={sectionClasses({
        themeDark: blok.styles?.includes('themeDark'),
        smallSpaces: blok.styles?.includes('smallSpaces'),
      })}
      {...storyblokEditable(blok)}
    >
      <Container>
        {blok.headline && (
          <div
            className={headlineClasses({
              justifyCenter: blok.styles?.includes('justifyCenter'),
            })}
          >
            {compiler(blok.headline, { wrapper: null, overrides: Typography })}
          </div>
        )}
        {blok.body && (
          <div
            className={bodyClasses({
              justifyCenter: blok.styles?.includes('justifyCenter'),
              smallSpaces: blok.styles?.includes('smallSpaces'),
            })}
          >
            {blok.body.map((body, index) => (
              <StoryblokComponent blok={body} parent='section' key={index} />
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
