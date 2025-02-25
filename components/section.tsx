import type { SectionProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

interface SectionComponent {
  blok: SectionProps
  parent?: 'page' | 'carousel'
}

export default function Section({ blok, parent }: SectionComponent) {
  const Tag = parent !== 'carousel' ? 'section' : 'div'

  const background = blok.contents.find(
    (content) => content.component === 'background'
  )
  const contents = blok.contents.filter(
    (content) => content.component !== 'background'
  )

  const gridClasses =
    'grid grid-cols-12 gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 gap-y-2 sm:gap-y-3 md:gap-y-4 lg:gap-y-5 items-center'

  const Container = ({ children }: PropsWithChildren) =>
    parent !== 'carousel' || blok.contain ? (
      <div
        className={`px-6 max-w-[1280px] min-h-inherit mx-auto ${gridClasses}`}
      >
        {children}
      </div>
    ) : (
      children
    )

  const gradientClasses = tv({
    base: 'absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r  md:to-60% -z-10',
    variants: {
      themeDark: {
        true: 'from-dark mix-blend-multiply',
        false: 'from-light mix-blend-screen',
      },
    },
  })

  const tagClasses = tv({
    base: 'py-6 sm:py-8 md:py-10 lg:py-12 min-h-12 overflow-hidden',
    variants: {
      themeDark: {
        true: 'dark text-foreground bg-background',
        false: 'light',
      },
      hasBackground: {
        true: 'relative z-0 min-h-cover sm:min-h-lg py-0 [&_article]:backdrop-blur-sm [&_article]:rounded-3xl',
      },
      contain: {
        false: `${gridClasses}`,
      },
    },
    compoundVariants: [
      {
        hasBackground: true,
        themeDark: true,
        class:
          '[&_h1]:drop-shadow-dark [&_h2]:drop-shadow-dark [&_h3]:drop-shadow-dark [&_h4]:drop-shadow-dark [&_h5]:drop-shadow-dark [&_h6]:drop-shadow-dark [&_p]:drop-shadow-dark',
      },
      {
        hasBackground: true,
        themeDark: false,
        class:
          '[&_h1]:drop-shadow-light [&_h2]:drop-shadow-light [&_h3]:drop-shadow-light [&_h4]:drop-shadow-light [&_h5]:drop-shadow-light [&_h6]:drop-shadow-light [&_p]:drop-shadow-light',
      },
    ],
  })

  return (
    <Tag
      id={blok.id && blok.id.replaceAll(' ', '-')}
      className={tagClasses({
        themeDark: blok.dark,
        hasBackground: !!background,
        contain: parent !== 'carousel' || blok.contain,
      })}
      {...storyblokEditable(blok)}
    >
      <Container>
        {contents.map((content, index) => (
          <StoryblokComponent
            key={index}
            blok={content}
            parent={blok.component}
          />
        ))}
      </Container>
      {!!background && (
        <>
          <div className={gradientClasses({ themeDark: blok.dark })} />
          <StoryblokComponent blok={background} />
        </>
      )}
    </Tag>
  )
}
