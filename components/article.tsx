import type { ArticleProps, StoryProps } from '@props/types'
import type { ArticleExtraProps } from '@pages/[...slug]'
import { StoryblokComponent } from '@storyblok/react'
import { Meta } from '@components/meta'
import { Nav } from '@components/nav'
import { Image, Link, Chip } from '@nextui-org/react'
import { div } from 'framer-motion/client'

interface ArticleComponent {
  blok: ArticleProps
  extra?: ArticleExtraProps
  article?: StoryProps
  parent?: string
}

export function Article({ blok, article, extra, parent }: ArticleComponent) {
  if (parent === 'grid') {
    return (
      <div className='blok sm:flex items-start gap-4'>
        <Link className='flex-0 overflow-hidden' href={article?.full_slug}>
          <Image
            src={blok.image?.filename}
            alt={blok.image?.alt}
            height={120}
          />
        </Link>
        <div className='flex-1 text-background space-y-2'>
          <h4 className='font-bold text-lg line-clamp-1 md:line-clamp-3'>{blok.title}</h4>
          <p className='text-sm line-clamp-3'>{blok.description}</p>
          <div className='flex gap-2'>
            {article?.tag_list.map((tag, index) => (
              <Chip className='bg-neutral-200 text-background' size='sm'>
                {tag}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <Meta {...blok} />
      {extra?.header && <Nav blok={extra.header.content} />}
      {blok.body &&
        blok.body.map((body, index) => (
          <StoryblokComponent blok={body} parent={body.component} key={index} />
        ))}
    </>
  )
}
