import type { AliasProps, EventProps, StoryProps } from '@props/types'
import { useEffect, useState } from 'react'
import { storyblokApi } from '@modules/storyblokApi'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { Image, Link as HeroLink } from '@heroui/react'
import { default as NextLink } from 'next/link'

interface AliasComponent {
  blok: AliasProps
  parent?: string
}

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
                openday
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
        const today = new Date()
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

        item = events.find(
          (item: storyEvent) => new Date(item.content.date) >= today
        )

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
    const openday = {
      date: {
        id: 'interesse_openday',
        value: alias.content.date.toLocaleDateString('it-IT', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        required: true,
        error: null,
      },
      course: {
        id: 'interesse_corso',
        value: alias.content.openday,
        required: true,
        error: null,
      },
    }

    return (
      <div
        {...storyblokEditable(blok)}
        className="flex flex-col gap-2 sm:gap-4 sm:flex-row col-span-12 items-start sm:items-center"
      >
        <div className="flex-1 sm:max-w-24 gap-2 sm:gap-1 flex sm:flex-col sm:justify-center items-baseline sm:items-center sm:px-6 sm:py-2 text-center">
          <span className="text-xl sm:text-3xl font-bold">
            {alias.content.date.toLocaleDateString('it-IT', { day: '2-digit' })}
          </span>
          <span className="text-xl font-semibold">
            {alias.content.date.toLocaleDateString('it-IT', { month: 'long' })}
          </span>
          <span className="text-lg font-semibold sm:text-xs sm:font-normal">
            {alias.content.date.toLocaleDateString('it-IT', {
              year: 'numeric',
            })}
          </span>
        </div>

        <div className="flex-1 space-y-3 block">
          <HeroLink
            href={alias.content.page.cachedUrl}
            isDisabled={!alias.content.page.cachedUrl}
            color="foreground"
          >
            {alias.content.title && (
              <h3 className="font-sans text-lg md:text-2xl xl:text-3xl font-bold leading-snug md:leading-snug xl:leading-snug">
                {alias.content.title}
              </h3>
            )}
          </HeroLink>
          {alias.content.description &&
            compiler(alias.content.description, {
              wrapper: 'div',
              forceWrapper: true,
              overrides: Typography({}),
            })}
          {alias.content.page.cachedUrl && !blok.submit?.length && (
            <HeroLink
              href={alias.content.page.cachedUrl}
              isDisabled={!alias.content.page.cachedUrl}
              color="foreground"
              className="font-semibold text-sm"
            >
              Vai alla pagina
            </HeroLink>
          )}
          {!!blok.submit?.length && blok?.submit.map((form, index) => (
            <StoryblokComponent blok={form} openday={openday} key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (isArticle) {
    return (
      <article className="col-span-12 md:col-span-10 flex flex-col md:flex-row gap-6 items-stretch ">
        <NextLink
          href={alias?.full_slug}
          className="flex-none w-full md:max-w-1/2"
        >
          <Image
            src={alias.content.image?.filename}
            alt={alias.content.image?.alt}
            radius="sm"
            isZoomed={true}
          />
        </NextLink>
        <div className="flex-1 space-y-6">
          <NextLink
            href={alias?.full_slug}
            className="hover:opacity-80 hover:transition-all transition-all space-y-3"
          >
            <h4 className="font-serif font-bold text-4xl">
              {alias.content.title}
            </h4>
            <p className="text-sm line-clamp-3 sm:line-clamp-none">
              {alias.content.description}
            </p>
          </NextLink>
          <HeroLink href={alias?.full_slug} color="foreground">
            Leggi articolo
          </HeroLink>
        </div>
      </article>
    )
  }

  return (
    <div className="col-span-12">
      <h3>{alias.content.title}</h3>
    </div>
  )
}
