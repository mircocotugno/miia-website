import type { StoryblokSource } from '@props/schema'

export type Sources = 'locations' | 'prices'

export const locations: StoryblokSource = {
  name: 'Sedi',
  slug: 'locations',
}

export const prices: StoryblokSource = {
  name: 'Prezzi',
  slug: 'Prices',
}

export const sources = {
  locations,
  prices,
}
