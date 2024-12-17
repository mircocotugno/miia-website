import dotenv from 'dotenv'
dotenv.config()

import StoryblokClient from 'storyblok-js-client'

const space = `spaces/${process.env.STORYBLOK_SPACE}`
const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_MANAGEMENT,
})

interface List {
  [key: string]: {
    path: string
    key: string
  }
}

const list: List = {
  component: {
    path: 'components',
    key: 'component',
  },
  group: {
    path: 'component_groups',
    key: 'component_group',
  },
  preset: {
    path: 'presets',
    key: 'preset',
  },
  source: {
    path: 'datasources',
    key: 'datasource',
  },
  entry: {
    path: 'datasource_entries',
    key: 'datasource_entry',
  },
}

interface StoryblokGet {
  type: string
  id: string | null
}

export async function storyblokGet({ type, id }: StoryblokGet) {
  return await Storyblok.get(
    `${space}/${list[type].path}/`,
    id ? { datasource: id } : undefined
  )
    .then(async (response) => {
      const data = await response.data
      return data[list[type].path]
    })
    .catch((err: string) => {
      console.error(err)
      return null
    })
}

interface StoryblokRead {
  id: string
  type: string
}

export async function storyblokRead({ id, type }: StoryblokRead) {
  return await Storyblok.get(`${space}/${list[type].path}/${id}`)
    .then(async (response) => {
      const data = await response.data
      return data[list[type].key]
    })
    .catch((err: string) => {
      console.error(err)
      return null
    })
}

interface StoryblokCreate {
  schema: object
  type: string
}

export async function storyblokCreate({ schema, type }: StoryblokCreate) {
  return await Storyblok.post(`${space}/${list[type].path}/`, {
    [list[type].key]: schema,
  })
    .then(async (response) => {
      const data = await response.data
      return data[list[type].key]
    })
    .catch((err: string) => {
      console.error(err)
      return null
    })
}

interface StoryblokUpdate {
  id: string
  type: string
  schema: object
}

export async function storyblokUpdate({ id, type, schema }: StoryblokUpdate) {
  return await Storyblok.put(`${space}/${list[type].path}/${id}`, {
    [list[type].key]: schema,
  })
    .then(async (response) => {
      const data = await response.data
      return data
    })
    .catch((err: string) => {
      console.error(err)
      return null
    })
}

interface StoryblokDelete {
  id: string
  type: string
}

export async function storyblokDelete({ id, type }: StoryblokDelete) {
  return await Storyblok.delete(`${space}/${list[type].path}/${id}`)
    .then(async (response) => {
      const data = await response.data
      return data
    })
    .catch((err: string) => {
      console.error(err)
      return null
    })
}
