import type { SourceSchema } from '@props/schema'

export type Sources = 'locations' | 'prices'

export const locations: SourceSchema = {
  name: 'Sedi',
  slug: 'locations',
}

export const prices: SourceSchema = {
  name: 'Prezzi',
  slug: 'Prices',
}

export const students: SourceSchema = {
  name: 'Studenti',
  slug: 'student',
}

export const courses: SourceSchema = {
  name: 'Corsi',
  slug: 'courses',
}

export const sources = {
  locations,
  prices,
  students,
  courses,
}
