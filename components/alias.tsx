import type {
  AliasProps,
  ArticleProps,
  EventProps,
  StoryProps,
} from '@props/types'
import { useEffect, useState } from 'react'
import { storyblokApi } from '@modules/storyblokApi'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { compiler } from 'markdown-to-jsx'
import { Image as HeroImage, Spinner, Skeleton } from '@heroui/react'
import { Typography } from './typography'
import Link from 'next/link'

interface AliasComponent {
  blok: AliasProps
  parent?: string
}

type EventStory = Omit<StoryProps, 'content'> & {
  content: Omit<EventProps, 'date'> & { date: Date }
}
type ArticleStory = StoryProps & { content: ArticleProps }
type AliasData = EventStory | ArticleStory | null

export default function Alias({ blok, parent }: AliasComponent) {
  if (!blok.resource) return null
  const isArticle = blok.resource === 'last-article'
  const isEvent = blok.resource === 'next-event'
  const [alias, setAlias] = useState<AliasData>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const getAlias = async () => {
      const variables = { isArticle, isEvent }
      const query = `
        query ($isArticle: Boolean!, $isEvent: Boolean!){      
          ArticleItems( per_page: 1, sort_by:"published_at:desc", resolve_relations: "article.author")
          @include(if: $isArticle) {
            items {
              full_slug
              published_at
              tag_list
              content {
                title
                image {
                  alt
                  filename
                  copyright
                  title
                }
                description
              }
            }
          }
          EventItems(sort_by: "position:asc", resolve_relations: "event.location")
          @include(if: $isEvent) {
            items {
              full_slug
              content {
                title
                description
                date
                location {
                  content
                }
                page {
                  cachedUrl
                  url
                }
              }
            }
          }
        }
      `
      const data = await storyblokApi({ query, variables })
      let item: AliasData = null

      if (data?.ArticleItems) {
        item = data?.ArticleItems.items[0] as ArticleStory
      } else if (data?.EventItems) {
        const today = new Date().toISOString()
        type storyEvent = { content: EventProps }

        const events = data.EventItems.items
          .filter((item: storyEvent) => !!item.content.date)
          .sort(
            (a: storyEvent, b: storyEvent) =>
              Date.parse(b.content.date) - Date.parse(a.content.date)
          )

        item = events.find(
          (item: storyEvent) =>
            Date.parse(item.content.date) > Date.parse(today)
        ) as EventStory
        item.content.date = new Date(item.content.date)
      }
      setAlias(item)
      setLoading(false)
    }
    getAlias().catch((error) => console.log(error))
  }, [])

  if (isLoading)
    return (
      <div className='col-span-12 sm:col-span-10 min-h-64 flex items-center justify-center'>
        <Spinner
          color='default'
          label='Caricamento'
          labelColor='foreground'
          size='lg'
        />
      </div>
    )
  if (!alias) return null

  if (isEvent) {
    const event = alias as EventStory
    const fieldOpenday = {
      id: 'openday',
      value: event.content.date.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      required: true,
      error: null,
    }

    return (
      <div
        {...storyblokEditable(blok)}
        className='flex flex-col sm:flex-row flex-wrap items-start sm:items-center col-span-12 gap-3'
      >
        <div className='flex-1 sm:max-w-24 gap-2 sm:gap-1 flex sm:flex-col sm:justify-center items-baseline sm:items-center sm:px-6 sm:py-2 text-center'>
          <span className='text-xl sm:text-3xl font-bold'>
            {event.content.date.toLocaleDateString('it-IT', {
              day: '2-digit',
            })}
          </span>
          <span className='text-xl font-semibold'>
            {event.content.date.toLocaleDateString('it-IT', {
              month: 'long',
            })}
          </span>
          <span className='text-lg font-semibold sm:text-xs sm:font-normal'>
            {event.content.date.toLocaleDateString('it-IT', {
              year: 'numeric',
            })}
          </span>
        </div>
        <div className='flex-1 space-y-3'>
          {event.content.title && (
            <h3 className='font-serif leading-tight font-bold break-words text-3xl md:text-4xl xl:text-5xl'>
              {event.content.title}
            </h3>
          )}
          {event.content.description &&
            compiler(event.content.description, {
              wrapper: 'p',
              forceWrapper: true,
              overrides: Typography,
            })}
        </div>
        {blok.form && (
          <div className='flex-1 sm:flex-none sm:min-w-32'>
            <StoryblokComponent
              blok={blok.form.content}
              openday={fieldOpenday}
            />
          </div>
        )}
      </div>
    )
  }

  if (isArticle) {
    const article = alias as ArticleStory
    return (
      <div
        {...storyblokEditable(blok)}
        className='col-span-12 lg:col-span-9 flex flex-col md:flex-row gap-4 sm:gap-8 py-8'
      >
        {article.content.image && (
          <Link href={article.full_slug}>
            <HeroImage
              src={article.content.image.filename}
              alt={article.content.image.alt}
              height={256}
              sizes={`(max-width:512px):128px,(max-width:768px):256px,(max-width:1024px):386px`}
              classNames={{
                wrapper: 'flex-1',
                img: 'inset-0 object-cover aspect-4/3',
              }}
            />
            <div
              className='absolute bottom-2 left-2 right-2 flex gap-3
            '
            ></div>
          </Link>
        )}
        <div className='flex-1 flex flex-col items-stretch gap-6 min-w-64'>
          <Link href={article.full_slug}>
            <h4 className='text-3xl font-serif font-bold'>
              {article.content.title}
            </h4>
          </Link>
          <p>
            {article.content.description}
            <br />
            <Link href={article.full_slug} className='text-sm font-semibold'>
              Continua...
            </Link>
          </p>
        </div>
      </div>
    )
  }
}
