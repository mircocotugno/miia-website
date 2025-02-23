interface StoryblokApi {
  query: string
  variables?: {
    [key: string]: string | number | boolean
  }
}

export async function storyblokApi({ query, variables }: StoryblokApi) {
  const version =
    process.env.NEXT_PUBLIC_IS_PREVIEW === 'true' ? 'draft' : 'published'

  const res = await fetch('https://gapi.storyblok.com/v1/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW || '',
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
