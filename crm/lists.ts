export type ListNames =
  | 'default'
  | 'studenti'
  | 'docenti'
  | 'aziende'
  | 'clienti'

export type Lists = {
  [key: ListNames | string]: number
}

export const lists: Lists = {
  default: 2,
  studenti: 6,
  docenti: 12,
  aziende: 8,
  clienti: 10,
}
