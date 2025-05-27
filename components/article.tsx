import type { ArticleProps, StoryProps } from '@props/types'
import { storyblokEditable } from '@storyblok/react'
import { Image } from '@heroui/react'
import Link from 'next/link'
import { tv } from 'tailwind-variants'

interface ArticleComponent {
  blok: ArticleProps
  story: StoryProps
}

export default function Article({ blok, story }: ArticleComponent) {
  const article = blok.alias?.content || blok
  if (!article.title || !article.description || !article.image) return null

  const classes = tv({
    base: 'flex flex-wrap gap-4 items-end col-span-12 md:col-span-8',
  })

  return (
    <article className={classes()} {...storyblokEditable(blok)}>
      {article.image && (
        <Link
          className='flex-none min-w-16 w-full md:w-1/3'
          href={blok.alias?.full_slug || story.full_slug || ''}
        >
          <Image
            classNames={{
              wrapper: 'aspect-4/3 md:aspect-square w-full max-h-fit',
              img: 'absolute t-0 r-0 w-full h-full object-cover',
            }}
            src={article.image?.filename}
            alt={article.image?.alt}
            width={256}
          />
        </Link>
      )}
      <div className='flex-1 min-w-32 space-y-4'>
        <Link href={blok.alias?.full_slug || story.full_slug || ''}>
          <h4 className='font-bold leading-tight text-3xl'>{article.title}</h4>
        </Link>
        <p className='font-sans leading-snug max-sm:line-clamp-3'>
          {article.description}
        </p>
      </div>
    </article>
  )
}
