import { storyblokApi } from '@modules/storyblokApi'
import {
  ISbStoryData,
  useStoryblokState,
  StoryblokComponent,
} from '@storyblok/react'
import type {
  StoryProps,
  BlokProps,
  ArticleProps,
  NavProps,
} from '@props/types'
import { tv } from 'tailwind-variants'
import Meta from '@components/meta'
import  Nav  from '@components/nav'
import { Image as HeroImage } from '@heroui/react'
import Image from 'next/image'

const relations = [
  'page.header',
  'page.footer',
  'form.ref',
  'article.ref',
  'person.ref',
  'course.ref',
  'event.ref',
  'location.ref',
  'article.author',
  'alias.resource',
  'picture.author',
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
  if (article.ref) return null

  const author = article.author?.content || null
  const blogPage = blog.content

  const gradientClasses = tv({
    base: 'absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-dark md:to-60% -z-10',
  })

  return (
    <>
      <Meta {...article} />
      <main className='min-h-screen'>
        {blogPage.header && (
          <Nav parent='header' blok={blogPage.header.content} />
        )}
        <section className='py-6 lg:py-12 min-h-lg bg-cover bg-center text-background [&_article]:backdrop-blur-sm [&_article]:rounded-xl [&_h1]:drop-shadow-8xl [&_h2]:drop-shadow-8xl [&_h3]:drop-shadow-8xl [&_p]:drop-shadow-8xl'>
          <div className='relative z-10 px-6 max-w-[1280px] min-h-inherit mx-auto grid grid-cols-12 gap-x-4 gap-y-8 lg:gap-x-8 lg:gap-y-12 items-center'>
            <div className='col-span-12 md:col-span-8 lg:col-span-6 space-y-4'>
              {author?.image[0] && (
                <div className='flex gap-4 items-center'>
                  <HeroImage
                    src={author.image[0].filename}
                    alt={author.image[0].alt}
                    radius='full'
                    width={64}
                  />
                  <h4 className='font-medium'>{author.title}</h4>
                </div>
              )}
              {article.title && (
                <h1 className='font-serif leading-tight font-black break-words text-3xl sm:text4xl md:text-5xl'>
                  {article.title}
                </h1>
              )}
              {article.description && (
                <h3 className='font-semibold text-lg break-words line-clamp-5'>
                  {article.description}
                </h3>
              )}
              {page.first_published_at && <p>{page.first_published_at}</p>}
            </div>
          </div>
          {article.image && (
            <>
              <div className={gradientClasses()} />
              <Image
                src={article.image.filename}
                alt={article.image.alt}
                priority={true}
                fill={true}
                className='object-cover object-center -z-20'
              />
            </>
          )}
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
        <Nav parent='footer' blok={blogPage.footer.content} />
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
