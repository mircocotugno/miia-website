// TODO: Add type for Brevo contacts attributes

export type Attributes = NameAttribute

type NameAttribute = {
  id: 'nome'
  value: string
}

type SurnameAttribute = {
  id: 'cognome'
  value: string
}

type EmailAttribute = {
  id: 'email'
  value: string
}

type PhoneAttribute = {
  id: 'sms'
  value: string
}

type AreaAttribute = {
  id: 'area'
  value: Array<'interni' | 'moda'>
}

const area: AreaAttribute['value'] = ['interni','moda']

