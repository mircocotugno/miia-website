import type { SectionProps, PictureProps } from '@cms/components'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import type { PropsWithChildren, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

interface SectionComponent {
  blok: SectionProps
  contain?: boolean
}

const gridClasses = 'grid grid-cols-12 gap-2 md:gap-4 lg:gap-6 items-center'

export function Section({ blok, contain }: SectionComponent) {
  const Tag = contain ? 'div' : 'section'

  const hasBackground = blok.contents.findIndex((c: any) => !!c?.background)
  const background: PictureProps = blok.contents[hasBackground]

  const Container = ({ children }: PropsWithChildren) =>
    contain || blok.contain ? (
      <div
        className={`relative z-10 px-6 max-w-[1280px] min-h-inherit mx-auto ${gridClasses}`}
      >
        {children}
      </div>
    ) : (
      children
    )

  return (
    <Tag
      id={blok.id}
      className={sectionClasses({
        theme: blok.theme,
        hasBackground: hasBackground >= 0,
        contain: contain || blok.contain,
      })}
      style={
        background && {
          backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 60%), rgb(0 0 0 / 0%) 60%), url(${background.asset.filename})`,
        }
      }
      {...storyblokEditable(blok)}
    >
      <Container>
        {blok.contents.map((content, index) =>
          hasBackground !== index ? (
            <StoryblokComponent key={index} blok={content} />
          ) : null
        )}
      </Container>
    </Tag>
  )
}

const sectionClasses = tv({
  base: 'py-6 lg:py-12 min-h-inherit',
  variants: {
    theme: {
      dark: 'dark text-foreground bg-background',
    },
    hasBackground: {
      true: 'bg-cover bg-center text-background [&_h1]:drop-shadow-8xl [&_h2]:drop-shadow-8xl [&_h3]:drop-shadow-8xl [&_p]:drop-shadow-8xl',
    },
    contain: {
      false: `${gridClasses}`,
    },
  },
})
