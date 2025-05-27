import dotenv from 'dotenv'
dotenv.config()

const baseUrl = 'https://api.brevo.com/v3'

interface BrevoGetProps {
  path: string
  limit?: number
  offset?: number
}
export const brevoGet = async ({ path, limit, offset }: BrevoGetProps) =>
  await fetch(
    `${baseUrl}/${path}${limit ? `?limit=${limit}` : ''}${
      offset ? `&offset=${offset}&sort=desc` : ''
    }`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'api-key': process.env.BREVO_MANAGEMENT || '',
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err))

interface BrevoCreateProps {
  path: string
  identifier?: string
  body?: { [key: string]: any }
}

export const brevoCreate = async ({
  path,
  identifier,
  body,
}: BrevoCreateProps) =>
  await fetch(`${baseUrl}/${path}${identifier ? `/${identifier}` : ''}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_MANAGEMENT || '',
    },
    body: body ? JSON.stringify(body) : null,
  })
    .then((res) => res.json())
    .catch((err) => console.error(err))

interface BrevoUpdateProps {
  path: string
  identifier: string
  body: { [key: string]: any }
}

export const brevoUpdate = async ({
  path,
  identifier,
  body,
}: BrevoUpdateProps) =>
  await fetch(`${baseUrl}/${path}/${identifier}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_MANAGEMENT || '',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err))

interface BrevoDeleteProps {
  path: string
  identifier: string
  name?: string
  type?: 'email_id' | 'phone_id' | 'contact_is'
}

export const brevoDelete = async ({
  path,
  identifier,
  name,
  type,
}: BrevoDeleteProps) =>
  await fetch(
    `${baseUrl}/${path}${identifier ? `/${identifier}` : ''}${name ? `/${name}` : ''}${type ? `?identifierType=${type}` : ''}`,
    {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_MANAGEMENT || '',
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err))

const errorMessages = {
  'Invalid phone number': 'Numero di telefono non valido',
}
