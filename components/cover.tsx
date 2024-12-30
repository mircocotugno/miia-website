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

  const columnClasses = tv({
    base: 'flex-none space-y-2 lg:w-1/2 w-2/3 max-sm:w-full my-6 lg:my-12',
  })

  const containerClasses = tv({
    base: 'flex items-center px-6 mx-auto max-w-[1280px] min-h-inherit',
    variants: {
      justifyRight: {
        true: 'flex-row-reverse text-right',
      },
    },
  })

  const coverClasses = tv({
    base: 'py-6 lg:py-12 bg-background text-foreground',
    variants: {
      background: {
        true: 'bg-cover bg-center',
      },
      themeDark: {
        true: 'bg-forenground text-background',
      },
      minHeight: {
        true: 'min-h-60 md:min-h-80 lg:min-h-100',
      },
    },
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
