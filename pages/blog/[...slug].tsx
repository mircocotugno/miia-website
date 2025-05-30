import { storyblokApi } from '@modules/storyblokApi'
import {
  ISbStoryData,
  useStoryblokState,
  StoryblokComponent,
} from '@storyblok/react'
import type { StoryProps, ArticleProps, NavProps } from '@props/types'
import Meta from '@components/meta'
import Nav from '@components/nav'
import { Image as HeroImage } from '@heroui/react'
import { default as NextLink } from 'next/link'

const relations = [
  'page.header',
  'page.footer',
  'form.alias',
  'content.alias',
  'person.alias',
  'course.alias',
  'event.alias',
  'location.alias',
  'content.author',
  'alias.resource',
  'article.author',
]

interface PageStory {
  story: ISbStoryData & {
    id: string
    content: ArticleProps
  }
  blog: {
    content: {
      header: StoryProps & {
        content: NavProps
      }
      footer: StoryProps & {
        content: NavProps
      }
    }
  }
}

export default function PageStory({ story, blog }: PageStory) {
  const page = useStoryblokState(story, {
    resolveRelations: relations,
    preventClicks: true,
  })
  if (!page?.content) return null

  const article = page.content
  if (article.alias) return null

  const author = article.author?.content || null
  const blogPage = blog.content

  return (
    <>
      <Meta {...article} />
      {blogPage.header && (
        <Nav parent="header" blok={blogPage.header.content} />
      )}
      <main className="min-h-screen">
        <section className="py-6">
          <div className="px-6 max-w-[1280px] min-h-inherit mx-auto grid grid-cols-12 gap-x-4 gap-y-6 lg:gap-x-8 items-center">
            <NextLink
              href="/blog"
              className="col-span-12 text-sm font-medium inline-flex gap-2 items-center"
            >
              <i className="iconoir-arrow-left" />
              Torna alla lista
            </NextLink>
            {!!article.image?.filename && (
              <HeroImage
                src={article.image.filename}
                alt={article.image.alt}
                sizes={`(max-width:512px)::512px,(max-width:768px)::768px,(max-width:1024px):1024px,(max-width:1280px):1280px,1280px`}
                classNames={{
                  wrapper: 'col-span-12',
                  img: 'h-auto',
                }}
              />
            )}
            <div className="col-span-12 sm:col-span-8">
              {(!!author || !!page?.first_published_at) && (
                <div className="inline-flex gap-6 w-full">
                  {page.first_published_at && (
                    <h4 className="font-medium inline-flex items-center gap-2">
                      <i className="iconoir-calendar" />
                      <span>{page.first_published_at}</span>
                    </h4>
                  )}
                  {author?.title && (
                    <h4 className="font-medium inline-flex items-center gap-2">
                      <i className="iconoir-profile-circle" />
                      <span>{author.title}</span>
                    </h4>
                  )}
                </div>
              )}
              {article.title && (
                <h1 className="font-serif break-words text-5xl md:text-6xl xl:text-7xl font-black leading-tight md:leading-tight xl:leading-none">
                  {article.title}
                </h1>
              )}
            </div>
          </div>
        </section>
        {article.body &&
          article.body.map((body, index) => (
            <StoryblokComponent
              blok={body}
              parent={body.component}
              key={index}
            />
          ))}
      </main>
      {blogPage.footer && (
        <Nav parent="footer" blok={blogPage.footer.content} />
      )}
    </>
  )
}

export async function getStaticProps({ params }: any) {
  let slug = `blog/${params.slug.join('/')}`

  const variables = { slug, relations: relations.join(',') }
  const query = `
    query ($slug: ID!, $relations: String) {
      ContentNode(
        id: $slug,
        resolve_relations: $relations
      ) {
        id
        slug
        content
        first_published_at
        tag_list
      }
      PageItem(id: "/blog") {
        content {
          header {
            content
          }
          footer {
            content
          }
        }
      }
    }
  `
  const data = await storyblokApi({ query, variables })

  return {
    props: {
      story: data?.ContentNode || null,
      blog: data?.PageItem || null,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  const query = `
    query {
      ArticleItems {
        items {
          id
          full_slug
          sort_by_date
        }
      }
    }
  `
  const slugs = await storyblokApi({ query })
  const paths: Array<string> = slugs.ArticleItems.items.map(
    ({ full_slug }: { full_slug: string }) => `/${full_slug}`
  )

  return {
    paths: paths,
    fallback: 'blocking',
  }
}
