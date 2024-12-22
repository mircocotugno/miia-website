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

const resolvers = ['page.header', 'page.footer', 'grid.items']

export default function Home({ story }: Home) {
  const page = useStoryblokState(story, {
    resolveRelations: resolvers,
    preventClicks: true,
  })
  if (!page?.content) return null
  return <StoryblokComponent blok={page.content} />
}

export async function getStaticProps() {
  const slug = 'home'
  const relations = resolvers.join(',')

  const variables = { slug, relations }
  const query = `
  query ($relations: String) {
    ContentNode(
      id: "home",
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
