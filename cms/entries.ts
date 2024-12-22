import { EntrySchema } from '@props/schema'
import type { PriceProps } from '@props/types'

export type LocationEntry = EntrySchema & {
  name: 'title'
  value: {
    title: string | null
    city: string | null
    address: string | null
    cap: string | null
    phone: string | null
    email: string | null
    lat: string | null
    lng: string | null
    direction: string | null
  }
}

const locations: LocationEntry = {
  name: 'title',
  datasource_id: 'locations',
  value: {
    title: null,
    city: null,
    address: null,
    cap: null,
    phone: null,
    email: null,
    lat: null,
    lng: null,
    direction: null,
  },
}

// type PriceEntry = Omit<EntrySchema, 'value'> & { value: PriceProps }

// const priceShortCourse: PriceEntry = {
//   name: 'corso_brece',
//   datasource_id: 'prices',
//   value: {
//     low: 490,
//     total: 3680,
//     installments: [
//       { installments: 1, price: 3680, total: 3680 },
//       { installments: 8, price: 490, total: 3920 },
//       { installments: 4, price: 950, total: 3800 },
//     ],
//   },
// }

export type CourseEntry = EntrySchema & {
  name: 'title'
  value: {
    title: string | null
    enrolled: string | null
    location: string | null
    starts: string | null
    ends: string | null
    frequency: string | null
    firstLesson: string | null
    secondLesson: string | null
    firstCoach: string | null
    secondCoach: string | null
    thirdCoach: string | null
  }
}

const courses: CourseEntry = {
  name: 'title',
  datasource_id: 'courses',
  value: {
    title: null,
    enrolled: null,
    location: null,
    starts: null,
    ends: null,
    frequency: null,
    firstLesson: null,
    secondLesson: null,
    firstCoach: null,
    secondCoach: null,
    thirdCoach: null,
  },
}

export const entries = {
  locations,
  courses,
}
