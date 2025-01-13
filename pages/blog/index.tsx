import { useEffect, useState } from 'react'
import {
  StoryblokComponent,
  useStoryblokState,
  ISbStoryData,
} from '@storyblok/react'

import { storyblokApi } from '@modules/storyblokApi'
import { StoryProps, type ArticleProps, type PageProps } from '@props/types'
import { Meta } from '@components/meta'
import { Nav } from '@components/nav'
import Link from 'next/link'
import { Image, Chip, Button } from '@nextui-org/react'

interface pageContent {
  id: string
  content: PageProps
}

interface Blog {
  story: ISbStoryData & {
    page: pageContent
    articles: Array<StoryProps & { content: ArticleProps }> | null
    hasMore: boolean
    tags: Array<{ name: string }> | null
  }
}

const slug = 'blog/'
const pagination = 10
const relations = ['article.author', 'page.header', 'page.footer']

export default function Blog({ story }: Blog) {
  const page: pageContent = useStoryblokState(story.page, {
    resolveRelations: relations,
    preventClicks: true,
  })

  if (!page?.content && !story.articles?.length) return null

  const [articles, setArticles] = useState(story.articles)
  const [loadMore, setLoadMore] = useState(false)
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    const getMoreArticle = async () => {
      const variables = {
        relations: relations.join(','),
        pagination,
        page: current + 1,
      }
      const query = `
        query ($relations: String, $pagination: Int, $page: Int) {
          ArticleItems(
            sort_by: "position:asc",
            resolve_relations: $relations,
            page: $page
            per_page: $pagination
          ) {
            items {
              full_slug
              tag_list
              first_published_at
              content {
                author {
                  content
                }
                title
                image {
                  alt
                  filename
                }
                description
              }
            }
          }
        }
      `
      if (loadMore) {
        const data = await storyblokApi({ query, variables })
        const newArticles = data?.ArticleItems.items.length
          ? articles?.concat(data?.ArticleItems.items)
          : null

        if (newArticles) {
          setArticles(newArticles)
        }
        setCurrent(newArticles ? current + 1 : current)
        setLoadMore(false)
      }
    }
    getMoreArticle().catch((error) => console.log(error))
  }, [loadMore])

  const { tags, hasMore } = story

  return (
    <>
      <Meta {...page.content} />
      {page.content.header.content && (
        <Nav blok={page.content.header.content} />
      )}
      {articles?.length && (
        <section className='py-6 pb-10 lg:py-12 lg:pb-20 space-y-8 bg-foreground text-background'>
          <div className='px-6 mx-auto space-y-6 max-w-[1280px] min-h-inherit'>
            <div>
              {tags?.length &&
                tags.map(({ name }, index) => <Chip key={index}>{name}</Chip>)}
            </div>
            <div className='flex flex-wrap gap-6 lg:gap-8'>
              {articles.map((post, index) => (
                <article
                  className='flex-1 min-w-full sm:min-w-60 sm:max-w-72 space-y-2'
                  key={index}
                >
                  <Link href={post?.full_slug} className='relative'>
                    <Image
                      src={post.content.image?.filename}
                      alt={post.content.image?.alt}
                      width='100%'
                      classNames={{
                        wrapper: 'flex-1 min-w-20 max-w-60 overflow-hidden',
                      }}
                      radius='sm'
                    />
                    <div className='inline-flex gap-2 flex-wrap absolute w-full bottom-0 z-20 p-2'>
                      {post?.tag_list.map((tag, index) => (
                        <Chip
                          key={index}
                          classNames={{
                            base: 'bg-neutral-200 text-background',
                            content: 'font-medium',
                          }}
                          size='sm'
                        >
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  </Link>

                  <div className='flex-1 text-background space-y-2'>
                    <Link href={post?.full_slug} key={index}>
                      <h4 className='font-bold text-lg leading-5 line-clamp-5'>
                        {post.content.title}
                      </h4>
                    </Link>
                    <p className='text-sm md:line-clamp-3 line-clamp-5'>
                      {post.content.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            {hasMore && (
              <div className='inline-flex'>
                <Button onPress={() => setLoadMore(true)}>
                  Carica altri articoli
                </Button>
              </div>
            )}
          </div>
        </section>
      )}
      {page.content.body &&
        page.content.body.map((body, index) => (
          <StoryblokComponent blok={body} parent='page' key={index} />
        ))}
      {page.content.footer.content && <footer>footer</footer>}
    </>
  )
}

export async function getStaticProps() {
  const variables = { slug, relations: relations.join(','), pagination }
  const query = `
    query ($slug: ID!,$relations: String, $pagination: Int) {
      PageItem(
        id: $slug,
        resolve_relations: $relations
      ) {
        id
        content {
          title
          image {
            alt
            filename
          }
          header {
            content
          }
          body
          footer {
            content
          }
        }
      }
      ArticleItems(
        sort_by: "position:asc",
        resolve_relations: $relations,
        per_page: $pagination
      ) {
        items {
          full_slug
          tag_list
          first_published_at
          content {
            author {
              content
            }
            title
            image {
              alt
              filename
            }
            description
          }
        }
        total
      }
      Tags {
        items {
          name
        }
      }
    }
`
  const data = await storyblokApi({ query, variables })

  return {
    props: {
      story: {
        page: data?.PageItem || null,
        articles: data?.ArticleItems.items || null,
        hasMore: data?.ArticleItems.total > pagination,
        tags: data?.Tags.items || null,
      },
    },
    revalidate: 3600,
  }
}
