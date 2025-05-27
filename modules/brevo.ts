import type { FormList, FormData, BrevoProps, FormArea } from '@props/types'
import { attributes } from '@crm/attributes'

const baseUrl = 'https://api.brevo.com/v3/'
const apiKey = process.env.NEXT_PUBLIC_BREVO_TOKEN

const listIds = {
  studenti: 40,
  docenti: 41,
  aziende: 42,
  clienti: 43,
}

export async function checkContact(email: string) {
  // TODO: some attributes are type multi-select but return index of value...
  if (!email) return console.error('Email non trovata')
  const response = await apiGet(`contacts/${email}`)
  // console.log(response)
  return response
}

export async function brevoApi(list: FormList, data: FormData) {
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
      if (typeof attributes[key] !== 'undefined') {
        const type = attributes[key].type
        if (type === 'multiple-choice') {
          value = typeof value === 'string' ? [value] : value
        }
        if (['persona_nascita', 'openday_data'].includes(key)) {
          value = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
        }
      }
      contact.attributes[key.toUpperCase()] = value
    })

  // Manage lists
contact.listIds = [!!list ? listIds[list] : 19]

  // Check if exist
  let response: any = {}
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
  // TODO check why apiPut response is undefined
  if (!!response?.message) {
    response = {}
    response.code = !response ? false : !response?.code
    response.message = `#####Ops, qualcosa è andato storto ${data?.nome?.value || ''}!
    ${!!response.message ? `\nÈ stato trovato il seguente errore: **${response.message}**` : ''}
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
