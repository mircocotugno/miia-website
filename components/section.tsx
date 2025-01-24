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
  const Container = ({ children }: PropsWithChildren) =>
    parent === 'page' ? (
      <div
        className={containerClasses({
          fullScreen: blok.styles?.includes('fullScreen'),
        })}
      >
        {children}
      </div>
    ) : (
      children
    )

  return (
    <section
      id={blok.id}
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
              fullScreen: blok.styles?.includes('fullScreen'),
            })}
          >
            {compiler(blok.headline, { wrapper: null, overrides: Typography })}
          </div>
        )}
        {blok.body && (
          <div
            className={bodyClasses({
              justifyCenter: blok.styles?.includes('justifyCenter'),
              alignCenter: blok.styles?.includes('alignCenter'),
              smallSpaces: blok.styles?.includes('smallSpaces'),
            })}
          >
            {blok.body.map((body, index) => (
              <StoryblokComponent
                blok={body}
                parent='section'
                centered={blok.styles?.includes('justifyCenter')}
                key={index}
              />
            ))}
          </div>
        )}
        {!!blok.footer.length && (
          <div
            className={footerClasses({
              justifyCenter: blok.styles?.includes('justifyCenter'),
              fullScreen: blok.styles?.includes('fullScreen'),
            })}
          >
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
      true: 'lg:py-6 space-y-4',
    },
  },
})
const bodyClasses = tv({
  base: 'gap-6 grid grid-cols-12 grid-flow-row-dense',
  variants: {
    justifyCenter: {
      true: 'justify-center text-center',
    },
    alignCenter: {
      true: 'items-center',
    },
    smallSpaces: {
      true: 'gap-3',
    },
  },
})
const headlineClasses = tv({
  base: 'space-y-4',
  variants: {
    justifyCenter: {
      true: 'mx-auto text-center',
    },
    fullScreen: {
      true: 'px-6',
    },
  },
})
const footerClasses = tv({
  base: 'space-y-2',
  variants: {
    justifyCenter: {
      true: 'mx-auto text-center',
    },
    fullScreen: {
      true: 'px-6',
    },
  },
})
const containerClasses = tv({
  base: 'blok space-y-6',
  variants: {
    fullScreen: {
      false: 'px-6 mx-auto max-w-[1280px] min-h-inherit',
    },
  },
})
