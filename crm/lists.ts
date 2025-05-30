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
  default: 19,
  studenti: 40,
  docenti: 41,
  aziende: 42,
  clienti: 43,
}
