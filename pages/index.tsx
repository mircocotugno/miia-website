import {
  StoryblokComponent,
  useStoryblokState,
  ISbStoryData,
} from '@storyblok/react'

import { storyblokApi } from '@modules/storyblokApi'
import { StoryProps } from '@props/types'

type Home = {
  story: ISbStoryData & {
    id: string
    content: StoryProps
  }
}

const relations = ['page.header', 'page.footer', 'alias.resource', 'map.locations']

export default function Home({ story }: Home) {
  const page = useStoryblokState(story, {
    resolveRelations: relations,
    preventClicks: true,
  })
  if (!page?.content) return null
  return <StoryblokComponent blok={page.content} />
}

export async function getStaticProps({ preview }: any) {
  const slug = 'home'

  const variables = { slug, relations: relations.join(',') }
  const query = `
    query ($slug: ID!, $relations: String) {
      ContentNode(
        id: $slug,
        resolve_relations: $relations
      ) {
        id
        content
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
