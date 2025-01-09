import { storyblokApi } from '@modules/storyblokApi'
import type { BlokProps } from '@props/types'
import {
  ISbStoryData,
  useStoryblokState,
  StoryblokComponent,
} from '@storyblok/react'

const excluding_slugs = ['home', 'blog/']

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
}

export default function PageStory({ story }: PageStory) {
  const page = useStoryblokState(story, {
    resolveRelations: relations,
    preventClicks: true,
  })
  if (!page) return null

  return <StoryblokComponent blok={page.content} />
}

export async function getStaticProps({ params }: any) {
  let slug = `/${params.slug.join('/')}`

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
    }
  `
  const data = await storyblokApi({ query, variables })

  return {
    props: {
      story: data?.ContentNode || null,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  const variables = { excluding_slugs: excluding_slugs.join(',') }
  const query = `
    query ($excluding_slugs: String) {
      ContentNodes(
        excluding_slugs: $excluding_slugs, 
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
  const slugs = await storyblokApi({ query, variables })
  const paths: Array<string> = slugs.ContentNodes.items.map(
    ({ full_slug }: { full_slug: string }) => `/${full_slug}`
  )

  return {
    paths: paths,
    fallback: 'blocking',
  }
}
