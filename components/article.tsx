import type { ArticleProps, StoryProps } from '@props/types'
import { storyblokEditable } from '@storyblok/react'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import { tv } from 'tailwind-variants'

interface ArticleComponent {
  blok: ArticleProps
  story: StoryProps
}

export function Article({ blok, story }: ArticleComponent) {
  const classes = tv({
    base: 'flex flex-wrap gap-4 items-end',
  })

  return (
    <article className={classes()} {...storyblokEditable(blok)}>
      {blok.image && (
        <Link className='flex-none min-w-16 w-full md:w-1/3' href={story.full_slug}>
          <Image
            classNames={{
              wrapper: 'aspect-4/3 md:aspect-square w-full max-h-fit',
              img: 'absolute t-0 r-0 w-full h-full object-cover',
            }}
            src={blok.image?.filename}
            alt={blok.image?.alt}
            width={256}
          />
        </Link>
      )}
      <div className='flex-1 min-w-32 space-y-4'>
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
