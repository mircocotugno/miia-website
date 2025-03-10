import type { AliasProps, EventProps, StoryProps } from '@props/types'
import { useEffect, useState } from 'react'
import { storyblokApi } from '@modules/storyblokApi'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { Link } from '@heroui/react'

interface AliasComponent {
  blok: AliasProps
  parent?: string
}

const relations = [
  'article.author',
  'person.ref',
  'course.ref',
  'event.ref',
  'location.ref',
  'alias.resource',
  'map.locations',
  'picture.author',
]

type AliasData = (StoryProps & { content: any }) | null

export default function Alias({ blok, parent }: AliasComponent) {
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
              name
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
              name
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
      let item = null

      if (data?.ArticleItems) {
        item = data?.ArticleItems.items[0]
      } else if (data?.EventItems) {
        const today = new Date().toISOString()
        type storyEvent = StoryProps & { content: EventProps }

        const events = data.EventItems.items
          .filter((item: storyEvent) =>
            !!item.content.date && !!blok.filter
              ? item.name.includes(blok.filter)
              : true
          )
          .sort((a: storyEvent, b: storyEvent) => {
            let A = new Date(a.content.date)
            let B = new Date(b.content.date)
            return A < B ? -1 : A > B ? 1 : 0
          })

        item = events.find((item: storyEvent) => item.content.date >= today)

        item.content.date = new Date(item.content.date)
      }
      setAlias(item)
      setLoading(false)
    }
    getAlias().catch((error) => console.log(error))
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!alias) return null

  if (isEvent) {
    const fieldOpenday = {
      id: 'openday_data',
      value: alias.content.date.toLocaleDateString('it-IT', {
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
        className='flex flex-col gap-2 sm:gap-4 sm:flex-row col-span-12 items-center'
      >
        <Link
          href={alias.content.page.cachedUrl}
          isDisabled={!alias.content.page.cachedUrl}
          color='foreground'
          className='flex-1 sm:max-w-24 gap-2 sm:gap-1 flex sm:flex-col sm:justify-center items-baseline sm:items-center sm:px-6 sm:py-2 text-center'
        >
          <span className='text-xl sm:text-3xl font-bold'>
            {alias.content.date.toLocaleDateString('it-IT', { day: '2-digit' })}
          </span>
          <span className='text-xl font-semibold'>
            {alias.content.date.toLocaleDateString('it-IT', { month: 'long' })}
          </span>
          <span className='text-lg font-semibold sm:text-xs sm:font-normal'>
            {alias.content.date.toLocaleDateString('it-IT', {
              year: 'numeric',
            })}
          </span>
        </Link>

        <Link
          href={alias.content.page.cachedUrl}
          isDisabled={!alias.content.page.cachedUrl}
          color='foreground'
          className='flex-1 space-y-3'
        >
          {alias.content.title && (
            <h3 className='font-serif leading-tight font-bold break-words text-3xl md:text-4xl xl:text-5xl'>
              {alias.content.title}
            </h3>
          )}
          {alias.content.description &&
            compiler(alias.content.description, {
              wrapper: 'p',
              forceWrapper: true,
              overrides: Typography({}),
            })}
        </Link>
        {blok.form.content && (
          <div className='flex-0'>
            <StoryblokComponent
              blok={blok.form.content}
              openday={fieldOpenday}
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='col-span-12'>
      <h3>{alias.content.title}</h3>
    </div>
  )
}
