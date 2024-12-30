import type { StoryProps } from '@props/types'
import type { ISbStoryData } from '@storyblok/react'

interface StoryblokApi {
  query: string
  variables?: {
    slug?: string
    relations?: string
  }
}

export async function storyblokApi({ query, variables }: StoryblokApi) {
  const version = process.env.NODE_ENV == 'production' ? 'published' : 'draft'

  const res = await fetch('https://gapi.storyblok.com/v1/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || '',
      Version: version,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
  }

  return json.data
}
