import type { FormList } from '@props/types'
import type { NextApiRequest, NextApiResponse } from 'next'

type BrevoContact = {
  id?: number
  list?: FormList
  email?: string | null
  attributes?: {
    [key: string]: any
  }
}

type BrevoRequestBody = {
  scope: 'find' | 'create' | 'update'
  contact: BrevoContact
}

export type BrevoResponse = {
  id?: number
  email?: string | null
  attributes?: {
    [key: string]: any
  }
  messageId?: string
  error?: string
}

export default async function sendBrevo(
  req: NextApiRequest,
  res: NextApiResponse<BrevoResponse>
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'PUT', 'GET'])
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const token = process.env.BREVO_TOKEN
  if (!token) {
    return res
      .status(500)
      .json({ error: 'Missing Brevo API key in environment' })
  }

  const { scope, contact }: BrevoRequestBody = req.body
  let endpoint = 'https://api.brevo.com/v3/contacts'
  let options: RequestInit = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': token,
    },
  }

  switch (scope) {
    case 'find':
      endpoint = endpoint + '/' + contact.email
      options.method = 'GET'
      break
    case 'create':
      options.method = 'POST'
      options.body = JSON.stringify(contact)
      break
    case 'update':
      endpoint = endpoint + '/' + contact.id
      options.method = 'PUT'
      options.body = JSON.stringify(contact)
      break
  }

  try {
    const brevoRes = await fetch(endpoint, options)

    let data: any = null

    // Solo se non è 204 (No Content) provo a leggere il JSON
    if (brevoRes.status !== 204) {
      try {
        data = await brevoRes.json()
      } catch (e) {
        console.warn('Nessun JSON nella risposta:', e)
        data = null
      }
    }

    if (!brevoRes.ok) {
      console.log('Status Brevo:', brevoRes.status)
      console.log('Risposta Brevo:', JSON.stringify(data, null, 2))
      return res
        .status(brevoRes.status)
        .json({ error: data || 'Brevo API Error' })
    }

    if (scope === 'find') {
      const { id, email, attributes } = data
      return res.status(200).json({ id, email, attributes })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('Brevo API call failed:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
