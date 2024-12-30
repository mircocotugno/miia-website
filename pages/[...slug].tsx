import { storyblokApi } from '@modules/storyblokApi'
import type { BlokProps } from '@props/types'
import {
  ISbStoryData,
  useStoryblokState,
  StoryblokComponent,
} from '@storyblok/react'

const relations = [
  'page.header',
  'page.footer',
  'article.author',
  'enroll.header',
  'enroll.footer',
  'enroll.courses',
  'enroll.form',
  'grid.items',
  'alias.item',
]

type PageStory = {
  story: ISbStoryData & {
    id: string
    content: BlokProps
  }
  extra?: Array<any>
}

export default function PageStory({ story, extra }: PageStory) {
  const page = useStoryblokState(story, {
    resolveRelations: relations,
    preventClicks: true,
  })
  if (!page) return null

  return (
    <StoryblokComponent
      blok={page.content}
      tags={page.tag_list}
      published={page.first_published_at}
      extra={extra}
    />
  )
}

type ArticlePrevieProps = {
  full_slug: string
  first_published_at: any
  tag_list: Array<string>
  content: {
    title: string
  }
}

export type ArticleExtraProps = null | {
  header: any
  footer: any
  articles: Array<ArticlePrevieProps>
  tags: Array<string>
}

export async function getStaticProps({ params }: any) {
  let slug = `/${params.slug.join('/')}`

  const isArticle = slug.startsWith('/blog/')
  let articleExtraData: ArticleExtraProps = null

  // console.log(slug)

  const variables = { slug, isArticle, relations: relations.join(',') }
  const query = `
    query ($slug: ID!, $isArticle: Boolean!, $relations: String) {
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
      ArticleItems(per_page: 15) @include(if: $isArticle) {
        items {
          full_slug
          first_published_at
          tag_list
          content {
            title
          }
        }
      }
      PageItem(id: "/blog") @include(if: $isArticle) {
        content {
          header {
            content
          }
          footer {
            content
          }
        }
      }
      Tags @include(if: $isArticle) {
        items {
          name
        }
      }
    }
  `
  const data = await storyblokApi({ query, variables })

  if (isArticle) {
    articleExtraData = {
      header: data.PageItem.content.header,
      footer: data.PageItem.content.footer,
      articles: data.ArticleItems.items,
      tags: data.Tags.items,
    }
  }

  return {
    props: {
      story: data?.ContentNode || null,
      extra: articleExtraData,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  const query = `
    query {
      ContentNodes(
        excluding_slugs: "home", 
        filter_query: {
          component: {
            in: "page,enroll,article"
          }
        }
      ) {
        items {
          full_slug
        }
      }
    }
  `
  const slugs = await storyblokApi({ query })
  const paths = slugs.ContentNodes.items.map(
    ({ full_slug }: { full_slug: string }) => `/${full_slug}`
  )
  // console.log(paths)
  return {
    paths: paths,
    fallback: 'blocking',
  }
}
