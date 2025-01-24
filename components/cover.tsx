import { tv } from 'tailwind-variants'
import type { CSSProperties } from 'react'
import type { CoverProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

interface CoverComponent {
  blok: CoverProps
  parent?: string
}

export function Cover({ blok }: CoverComponent) {
  const sectionStyles: CSSProperties = {}
  const hasBackground = !!blok.background?.filename
  if (hasBackground) {
    sectionStyles.backgroundImage = `url(${blok.background.filename})`
  }

  const coverClasses = tv({
    base: 'py-12 lg:py-24 bg-forenground text-background',
    variants: {
      background: {
        true: 'bg-cover bg-center',
      },
      themeDark: {
        true: 'bg-background text-foreground',
      },
      minHeight: {
        true: 'min-h-80 md:min-h-100 lg:min-h-120',
      },
    },
  })

  const containerClasses = tv({
    base: 'flex items-center px-6 mx-auto max-w-[1280px] min-h-inherit',
    variants: {
      justifyRight: {
        true: 'justify-end text-right',
      },
    },
  })

  const columnClasses = tv({
    base: 'flex-none space-y-4 lg:w-1/2 w-2/3 max-sm:w-full my-6 lg:my-12',
  })

  return (
    <section
      className={coverClasses({
        themeDark: blok.styles.includes('themeDark'),
        minHeight: blok.styles.includes('minHeight'),
        background: hasBackground,
      })}
      style={sectionStyles}
      {...storyblokEditable(blok)}
    >
      <div
        className={containerClasses({
          justifyRight: blok.styles.includes('justifyRight'),
        })}
      >
        <div className={columnClasses()}>
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
