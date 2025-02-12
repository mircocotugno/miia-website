import type { SectionProps, PictureProps, MediaProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import Image from 'next/image'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

interface SectionComponent {
  blok: SectionProps
  parent?: 'page' | 'carousel'
}

export function Section({ blok, parent }: SectionComponent) {
  const Tag = parent !== 'carousel' ? 'section' : 'div'

  const hasBackground = blok.contents.findIndex(
    (content): content is PictureProps | MediaProps =>
      (content.component === 'picture' || content.component === 'media') &&
      !!content?.background
  )
  const background: PictureProps | MediaProps | undefined = blok.contents.find(
    (content): content is PictureProps | MediaProps =>
      (content.component === 'picture' || content.component === 'media') &&
      !!content?.background
  )
  let isVideo = background?.component === 'media'

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
        true: 'relative z-0 min-h-cover sm:min-h-lg py-0',
      },
      videoBackground: {
        false: '[&_article]:backdrop-blur-sm [&_article]:rounded-3xl',
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
      id={blok.id}
      className={tagClasses({
        themeDark: blok.dark,
        hasBackground: hasBackground >= 0,
        videoBackground: isVideo,
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
          <div className={gradientClasses({ themeDark: blok.dark })} />
          {background.component === 'picture' && (
            <>
              {background?.author && (
                <span className='text-bold text-sm absolute bottom-4 left-8 z-10'>
                  <small>@</small> {background.author.content.title}
                </span>
              )}
              <Image
                src={background.asset.filename}
                alt={background.asset.alt}
                priority={true}
                fill={true}
                quality={60}
                className='object-cover object-center -z-20 mix-blend-normal'
              />
            </>
          )}
          {background.component === 'media' && (
            <iframe
              {...storyblokEditable(background)}
              className='absolute w-[177.77777778vh] h-full min-w-full min-h-[56.25vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20'
              src={`https://www.youtube.com/embed/${background.source}?rel=0&modestbranding=1&autohide=1&showinfo=0&mute=1&showinfo=0&controls=0&autoplay=1&loop=1&playlist=${background.source}`}
              allow='autoplay'
              title='Product Overview Video'
              aria-hidden='true'
            />
          )}
        </>
      )}
    </Tag>
  )
}
