import type { SectionProps, PictureProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

interface SectionComponent {
  blok: SectionProps
  parent?: 'page' | 'enroll' | 'carousel'
}

export function Section({ blok, parent }: SectionComponent) {
  const Tag = parent !== 'carousel' ? 'div' : 'section'

  const hasBackground = blok.contents.findIndex(
    (content): content is PictureProps =>
      content.component === 'picture' && !!content?.background
  )
  const background: PictureProps | undefined = blok.contents.find(
    (content): content is PictureProps =>
      content.component === 'picture' && !!content?.background
  )
  const gradient = blok.theme === 'dark' ? '255 255 255' : '0 0 0'

  const gridClasses =
    'grid grid-cols-12 gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 gap-y-2 sm:gap-y-3 md:gap-y-4 lg:gap-y-5 items-center'

  const sectionClasses = tv({
    base: 'py-6 sm:py-8 md:py-10 lg:py-12 min-h-12',
    variants: {
      theme: {
        dark: 'dark text-foreground bg-background',
      },
      hasBackground: {
        true: 'bg-cover bg-center text-background min-h-cover sm:min-h-lg py-0 [&_article]:backdrop-blur-sm [&_article]:rounded-xl [&_h1]:drop-shadow-8xl [&_h2]:drop-shadow-8xl [&_h3]:drop-shadow-8xl [&_p]:drop-shadow-8xl',
      },
      contain: {
        false: `${gridClasses}`,
      },
    },
  })

  const Container = ({ children }: PropsWithChildren) =>
    parent !== 'carousel' || blok.contain ? (
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
        contain: parent !== 'carousel' || blok.contain,
      })}
      style={
        background && {
          backgroundImage: `linear-gradient(to right, rgb(${gradient} / 60%), rgb(${gradient} / 0%) 70%), url(${background.asset.filename})`,
        }
      }
      {...storyblokEditable(blok)}
    >
      <Container>
        {blok.contents.map((content, index) =>
          hasBackground !== index ? (
            <StoryblokComponent
              key={index}
              blok={content}
              parent={blok.component}
            />
          ) : null
        )}
      </Container>
    </Tag>
  )
}
