import type { AliasProps, EventProps, StoryProps } from '@props/types'
import { useEffect, useState } from 'react'
import { storyblokApi } from '@modules/storyblokApi'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { Image, Link as HeroLink } from '@heroui/react'
import { default as NextLink } from 'next/link'
import { tv } from 'tailwind-variants'

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
          ArticleItems( 
            sort_by:"published_at:desc", 
            resolve_relations: "article.author",
            per_page: 1, 
            filter_query: {hidden: {not_in: true}})
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
      id: 'openday',
      value: new Date(alias.content.date).toISOString(),
      required: true,
      error: null,
    }
    const dateClasses = tv({
      base: 'flex flex-col h-full w-full p-4',
      variants: {
        hasImage: {
          true: 'min-h-64 sm:min-h-0 bg-gradient-to-br from-background to-transparent to-75 bg-blend-multiply',
        },
      },
    })
    return (
      <div
        {...storyblokEditable(blok)}
        className="flex flex-col gap-2 sm:gap-4 sm:flex-row col-span-12 items-start sm:items-center"
      >
        <div
          className="flex-1 sm:max-w-64 bg-cover bg-center rounded-md overflow-hidden self-stretch flex"
          style={{
            backgroundImage: !!blok.image?.filename
              ? `url(${blok.image.filename})`
              : '',
          }}
        >
          <div className={dateClasses({ hasImage: !!blok.image?.filename })}>
            <p className="text-3xl font-semibold sm:block">
              <span className="sm:w-full sm:block">
                {alias.content.date.toLocaleDateString('it-IT', {
                  day: '2-digit',
                  month: 'long',
                })}
              </span>
              <span className="sm:w-full ml-1 sm:block sm:text-lg sm:font-medium">
                {alias.content.date.toLocaleDateString('it-IT', {
                  year: 'numeric',
                })}
              </span>
            </p>
          </div>
        </div>
        <div className="flex-1 space-y-4 block py-4">
          {alias.content.title &&
          (!alias.content.page.cachedUrl || !!blok.submit?.length) ? (
            <h3 className="font-sans text-lg md:text-2xl xl:text-3xl font-bold leading-snug md:leading-snug xl:leading-snug">
              {alias.content.title}
            </h3>
          ) : (
            <NextLink
              href={alias.content.page.cachedUrl}
              color="foreground"
              className="font-semibold text-sm hover:opacity-100 opacity-85 inline-flex"
            >
              <h3 className="font-sans text-lg md:text-2xl xl:text-3xl font-bold leading-snug md:leading-snug xl:leading-snug">
                {alias.content.title}
              </h3>
            </NextLink>
          )}

          {alias.content.description &&
            compiler(alias.content.description, {
              wrapper: 'div',
              forceWrapper: true,
              overrides: Typography({}),
            })}
          {alias.content.page.cachedUrl && !blok.submit?.length && (
            <NextLink
              href={alias.content.page.cachedUrl}
              className="font-medium text-sm py-2 hover:opacity-100 opacity-85 inline-flex border-2 border-foreground px-3 rounded-xl"
            >
              Vai alla pagina
            </NextLink>
          )}
          {!!blok.submit?.length &&
            blok?.submit.map((form, index) => (
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
          <NextLink
            href={alias?.full_slug}
            className="font-medium text-sm py-2 hover:opacity-100 opacity-85 inline-flex border-2 border-foreground px-3 rounded-xl"
          >
            Leggi articolo
          </NextLink>
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
