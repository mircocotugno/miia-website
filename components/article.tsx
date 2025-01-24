import type { ArticleProps } from '@props/types'
import { StoryblokComponent } from '@storyblok/react'
import { Meta } from '@components/meta'
import { Image } from '@nextui-org/react'
import Link from 'next/link'

interface ArticleComponent {
  blok: ArticleProps
  slug: string
  parent?: string
}

export function Article({ blok, slug, parent }: ArticleComponent) {
  if (parent === 'alias') {
    return (
      <article className='flex-1 grid grid-cols-4 gap-6'>
        {blok.image && (
          <Link href={slug}>
            <Image
              className='col-span-1'
              src={blok.image?.filename}
              alt={blok.image?.alt}
              width={'100%'}
            />
          </Link>
        )}
        <div className='col-span-2 space-y-4'>
          <Link href={slug}>
            <h4 className='font-bold leading-tight text-3xl text-background'>
              {blok.title}
            </h4>
          </Link>
          <p className='font-sans leading-snug max-sm:line-clamp-3'>
            {blok.description}
          </p>
        </div>
      </article>
    )
  }
  return (
    <>
      <Meta {...blok} />
      {blok.body &&
        blok.body.map((body, index) => (
          <StoryblokComponent blok={body} parent={body.component} key={index} />
        ))}
    </>
  )
}
