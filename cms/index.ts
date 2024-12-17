import dotenv from 'dotenv'
dotenv.config()
import util from 'util'

import { cancelRecords, getRecord, printRecord } from './record'
import {
  storyblokGet,
  storyblokRead,
  storyblokCreate,
  storyblokUpdate,
  storyblokDelete,
} from './api'

import type {
  ComponentSchema,
  EntrySchema,
  GroupSchema,
  PresetSchema,
  SourceSchema,
} from '@props/schema'

import { groups } from './groups'
import { components } from './components'
import { presets } from './presets'
import { sources } from './sources'
import { entries } from './entries'

type Operations =
  | 'get'
  | 'read'
  | 'create'
  | 'update'
  | 'delete'
  | 'help'
  | string
type Elements = 'group' | 'component' | 'preset' | 'source' | 'entry' | string
type Data =
  | GroupSchema
  | ComponentSchema
  | PresetSchema
  | SourceSchema
  | EntrySchema

const lists: {
  [key: Elements]: {
    [key: string]: Data
  }
} = {
  group: groups,
  component: components,
  preset: presets,
  source: sources,
  entry: entries,
}

async function storyblok(
  operation: Operations = process.argv[2],
  type: Elements = process.argv[3],
  name: string = process.argv[4]
) {
  if (operation === 'help') {
    return console.log(`
      To use 'storyblok' script:
        Operation are get, read, creare, update, delete, help
        Element are group, component, preset, source, entry
        Name of element type without spaces
      
      Example: npm run storyblok -- create component button
      `)
  }

  let element = null
  let schema = null
  let id: string | null = ''

  if (operation !== 'get') {
    if (typeof lists[type][name] == 'undefined') {
      return console.error(`Error! Element ${name} of type ${type} not exist.`)
    }
    schema = { ...lists[type][name] }
    if (type === 'component') {
      schema.component_group_uuid = getRecord({
        name: `${schema?.component_group_uuid}_group`,
        type: 'group',
        unique: true,
      })
    }
    id = getRecord({ name, type })
  }

  switch (operation) {
    // GET
    case 'get':
      id = getRecord({ name, type: 'source' })
      const elements = await storyblokGet({ type, id })
      if (elements) {
        return elements.forEach(
          (element: { id?: string; uuid?: string; name?: string }) =>
            console.log(
              `${element.name} ${type}:\n${element.id}\n${element.uuid}`
            )
        )
      } else {
        console.log(`Error reading there are no elements of type ${type}!`)
      }
      break
    // READ
    case 'read':
      if (id) {
        element = await storyblokRead({ id, type })
        if (element) {
          console.log(util.inspect(element, false, null, true))
        }
      } else {
        console.log(`Error reading ${name} ${type} not exist!`)
      }
      break
    // CREATE
    case 'create':
      if (schema) {
        element = await storyblokCreate({ schema, type })
        if (element) {
          printRecord({ name, type, id: element.id, uuid: element?.uuid })
          console.log(`${name} ${type} is created with id:${element.id}`)
        }
      } else {
        return console.error(`Error creating ${name} ${type}!`)
      }
      break
    // UPDATE
    case 'update':
      if (id && schema) {
        element = await storyblokUpdate({ schema, type, id })
        if (element) {
          console.log(`${name} ${type} is updated`)
        }
      } else {
        return console.error(`Error updating ${name} ${type}!`)
      }
      break
    // DELETE
    case 'delete':
      if (id) {
        element = await storyblokDelete({ id, type })
        if (element) {
          cancelRecords({ name, type })
          console.log(`${name} ${type} is deleted`)
        }
      } else {
        return console.error(`Error deleting ${name} ${type}!`)
      }
      break
    default:
      console.log(
        `There are no operations named ${operation} to get more information use -- help`
      )
      break
  }
}

storyblok()
