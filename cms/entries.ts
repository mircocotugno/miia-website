import { EntrySchema } from '@props/schema'
import type { LocationProps, PriceProps } from '@props/types'

type LocationEntry = Omit<EntrySchema, 'value'> & { value: LocationProps }

const locationTreviso: LocationEntry = {
  name: 'Treviso',
  datasource_id: 'location',
  value: {
    city: 'Treviso',
    address: 'Via Zorzetto, 20',
    cap: '31100',
    phone: '+39 0422 440188',
    email: 'treviso@madeinitalyacademy.com',
    position: { lat: 45.66361026232961, lng: 12.245983217385389 },
    direction: 'https://maps.app.goo.gl/cSXqXu8yz4tGQvYn9',
  },
}
const locationPadova: LocationEntry = {
  name: 'Padova',
  datasource_id: 'location',
  value: {
    city: 'Padova',
    address: 'Viale della Navigazione Interna, 51/A',
    cap: '35129',
    phone: '+39 0422 440188',
    email: 'padova@madeinitalyacademy.com',
    position: { lat: 45.409303548033336, lng: 11.928371084638048 },
    direction: 'https://maps.app.goo.gl/GinetyzDYN8gUDDa9',
  },
}
const locationBassano: LocationEntry = {
  name: 'Bassano',
  datasource_id: 'location',
  value: {
    city: 'Bassano del Grappa',
    address: 'Via Madonna di Fatima 10',
    cap: '36061',
    phone: '+39 0422 440188',
    email: 'bassano@madeinitalyacademy.com',
    position: { lat: 45.73969990647777, lng: 11.756428313871918 },
    direction: 'https://maps.app.goo.gl/yWxgrayhYcsnQgWX8',
  },
}

type PriceEntry = Omit<EntrySchema, 'value'> & { value: PriceProps }

const priceShortCourse: PriceEntry = {
  name: 'corso_brece',
  datasource_id: 'prices',
  value: {
    price: 490,
    total: 3680,
    installments: [
      { installments: 1, price: 3680, total: 3680 },
      { installments: 8, price: 490, total: 3920 },
      { installments: 4, price: 950, total: 3800 },
    ],
  },
}

export const entries = {
  locationTreviso,
  locationPadova,
  locationBassano,
  priceShortCourse,
}
