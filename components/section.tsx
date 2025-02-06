import type { SectionProps, PictureProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import Image from 'next/image'
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
    base: 'absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-dark md:to-60% -z-10',
    variants: {
      theme: {
        dark: 'from-light',
      },
    },
  })

  const tagClasses = tv({
    base: 'py-6 sm:py-8 md:py-10 lg:py-12 min-h-12',
    variants: {
      theme: {
        dark: 'dark text-foreground bg-background',
      },
      hasBackground: {
        true: 'relative z-0 text-background min-h-cover sm:min-h-lg py-0 [&_article]:backdrop-blur-sm [&_article]:rounded-xl [&_h1]:drop-shadow-dark [&_h2]:drop-shadow-dark [&_h3]:drop-shadow-dark [&_p]:drop-shadow-dark',
      },
      contain: {
        false: `${gridClasses}`,
      },
    },
    compoundVariants: [
      {
        hasBackground: true,
        theme: 'dark',
        class: '[&_h1]:drop-shadow-light [&_h2]:drop-shadow-light [&_h3]:drop-shadow-light [&_p]:drop-shadow-light',
      },
    ],
  })

  return (
    <Tag
      id={blok.id}
      className={tagClasses({
        theme: blok.theme,
        hasBackground: hasBackground >= 0,
        contain: parent !== 'carousel' || blok.contain,
      })}
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
      {background && (
        <>
          <div
            className={gradientClasses({
              theme: blok.theme,
            })}
          />
          <Image
            src={background.asset.filename}
            alt={background.asset.alt}
            priority={true}
            fill={true}
            className='object-cover object-center -z-20'
          />
        </>
      )}
    </Tag>
  )
}
