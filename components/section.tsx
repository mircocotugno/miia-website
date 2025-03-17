import type { SectionProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'

interface SectionComponent {
  blok: SectionProps
  parent?: 'page' | 'carousel'
  singleSection?: boolean
}

export default function Section({
  blok,
  parent,
  singleSection,
}: SectionComponent) {
  const Tag = parent !== 'carousel' ? 'section' : 'div'

  const background = blok.contents.find(
    (content) => content.component === 'background'
  )
  const contents = blok.contents.filter(
    (content) => content.component !== 'background'
  )

  return (
    <Tag
      id={blok.id && blok.id.replaceAll(' ', '-')}
      className={tagClasses({
        themeDark: blok.dark,
        rounded: parent === 'carousel',
        hasBackground: !!background,
        singleSection: singleSection,
      })}
      {...storyblokEditable(blok)}
    >
      <div className={containerClasses({ align: blok.align })}>
        {contents.map((content, index) => (
          <StoryblokComponent
            key={index}
            blok={content}
            parent={blok.component}
          />
        ))}
      </div>
      {!!background && (
        <>
          <div className={gradientClasses({ themeDark: blok.dark })} />
          <StoryblokComponent blok={background} />
        </>
      )}
    </Tag>
  )
}

const gradientClasses = tv({
  base: 'absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r  md:to-60% -z-10',
  variants: {
    themeDark: {
      true: 'from-dark mix-blend-multiply',
      false: 'from-light mix-blend-screen',
    },
  },
})

const containerClasses = tv({
  base: 'px-6 py-6 sm:py-8 md:py-10 lg:py-12 max-w-[1280px] min-h-inherit mx-auto grid grid-cols-12 gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-6 sm:gap-y-8 md:gap-y-10 items-baseline',
  variants: {
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
})

const tagClasses = tv({
  base: 'overflow-hidden',
  variants: {
    themeDark: {
      true: 'dark text-foreground bg-background',
      false: 'light',
    },
    rounded: {
      true: 'rounded-lg',
    },
    hasBackground: {
      true: 'relative z-0 py-0 min-h-cover [&_article]:backdrop-blur-sm [&_article]:rounded-3xl',
    },
    singleSection: {
      true: 'min-h-cover',
    },
  },
  compoundVariants: [
    {
      singleSection: true,
      hasBackground: true,
      class: 'sm:min-h-cover',
    },
    {
      singleSection: false,
      hasBackground: true,
      class: 'sm:min-h-3/4',
    },
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
