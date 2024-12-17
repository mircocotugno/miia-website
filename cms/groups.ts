import type { GroupSchema } from '@props/schema'

export type Groups = 'layouts' | 'containers' | 'elements' | 'resources'

const layouts: GroupSchema = {
  name: 'Pagine',
}

const containers: GroupSchema = {
  name: 'Contenitori',
}

const elements: GroupSchema = {
  name: 'Elementi',
}

const resources: GroupSchema = {
  name: 'Risorse',
}

export const groups = {
  layouts,
  containers,
  elements,
  resources,
}
