import type { FormScopes, FormData, BrevoProps, FormArea } from '@props/types'

const baseUrl = 'https://api.brevo.com/v3/'
const apiKey = process.env.NEXT_PUBLIC_BREVO_TOKEN

const listIds = {
  corsi: 10,
  aziende: 26,
  progetti: 25,
  docenza: 29,
  interni: 27,
  moda: 28,
  generici: 37,
}

export async function checkContact(email: string) {
  // TODO: some attributes are type multi-select but return index of value...
  if (!email) return console.error('Email non trovata')
  const response = await apiGet(`contacts/${email}`)
  return response
}

export async function brevoApi(scope: FormScopes, data: FormData) {
  const validation = data?.validation?.value
  if (!!validation) return false

  const email = data?.email?.value
  const name = data?.nome?.value
  const surname = data?.cognome?.value
  const sms = data?.sms?.value.replace(/^/, '+39')
  if (!email || !name || !surname || !sms)
    return {
      success: false,
      error: `###Indirizzo email non trovato!
      \nLa invitiamo a scriverci all'indirizzo email che trova nella nostra pagina [contatti](https://madeinitalyacademy.com/contatti)`,
    }

  // Manage attributes
  const contact: BrevoProps = {
    attributes: {
      NOME: name,
      COGNOME: surname,
      SMS: sms,
    },
  }

  Object.keys(data)
    .filter(
      (key) =>
        !['nome', 'cognome', 'sms', 'email'].includes(key) && !!data[key].value
    )
    .forEach((key) => {
      let value = data[key].value
      if (['persona_nascita', 'openday_data'].includes(key)) {
        value = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
      }
      contact.attributes[key.toUpperCase()] = value
    })

  // Manage lists
  const list = []
  if (scope) {
    list.push(listIds[scope])
  } else if (data?.scopo) {
    const dataScope: FormScopes = data.scopo.value[0]
    list.push(listIds[dataScope])
  } else {
    list.push(listIds.generici)
  }

  if (list[0] === listIds.corsi) {
    const area: FormArea = data?.area?.value
    area && list.push(listIds[area])
  }

  contact.listIds = list

  // Check if exist
  let response: any = null
  response = await apiGet(`contacts/${email}`)
  const userId = response?.id
  // console.log(userId)

  if (userId) {
    response = await apiPut('contacts', userId, contact)
  } else {
    contact.updateEnabled = true
    contact.email = email
    response = await apiPost('contacts', contact)
  }
  // console.log(contact)

  if (!!response?.message) {
    const name = data?.nome?.value
    response.message = `#####Ops, qualcosa è andato storto ${name || ''}!
    \nÈ stato trovato il seguente errore: **${response.message}**
    \nSe l'errore dovesse persistere, ci contatti all'indirizzo email info@miia.it`
  }

  return { success: !response?.code, error: response?.message }
}

const apiGet = async (path: string, limit = null, offset = null) =>
  await fetch(
    `${baseUrl}${path}${limit ? `?limit=${limit}` : ''}${
      offset ? `&offset=${offset}&sort=desc` : ''
    }`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'api-key': apiKey || '',
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err))

const apiPost = async (path: string, body: BrevoProps) =>
  await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey || '',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err))

const apiPut = async (path: string, identifier: string, body: BrevoProps) =>
  await fetch(`${baseUrl}${path}/${identifier}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey || '',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err))

const errorMessages = {
  'Invalid phone number': 'Numero di telefono non valido',
}
