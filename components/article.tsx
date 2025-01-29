import type { ArticleProps, StoryProps } from '@props/types'
import { storyblokEditable } from '@storyblok/react'
import { Image } from '@nextui-org/react'
import Link from 'next/link'

interface ArticleComponent {
  blok: ArticleProps
  story: StoryProps
}

export function Article({ blok, story }: ArticleComponent) {
  return (
    <article {...storyblokEditable(blok)}>
      {blok.image && (
        <Link href={story.full_slug}>
          <Image
            className='col-span-1'
            src={blok.image?.filename}
            alt={blok.image?.alt}
            width={'100%'}
          />
        </Link>
      )}
      <div className='col-span-2 space-y-4'>
        <Link href={story.full_slug}>
          <h4 className='font-bold leading-tight text-3xl'>{blok.title}</h4>
        </Link>
        <p className='font-sans leading-snug max-sm:line-clamp-3'>
          {blok.description}
        </p>
      </div>
    </article>
  )
}
