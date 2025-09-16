import type { NextApiRequest, NextApiResponse } from 'next'

export interface BrevoEvent {
  identifiers: { email_id: string }
  event_name: string
  event_date: string
  properties: { [key: string]: string | number }
}

export interface BrevoContact {
  id?: string | number
  email: string
  attributes: {
    [key: string]: any
  }
}

interface BrevoRequestBody {
  event?: BrevoEvent
  contact: BrevoContact
}

const apiUrl = 'https://api.bevo.com/v3'

type BrevoResponse = {}

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
    return res.status(500).json({ error: 'Missing Brevo Api Token' })
  }

  const optionsInit: RequestInit = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': token,
    },
  }

  const { contact, event }: BrevoRequestBody = req.body

  let contactData,
    eventData = null

  try {
    let endpoint = `${apiUrl}/contacts/`
    let options = { ...optionsInit }

    if (!event) {
      endpoint += contact.email
      options.method = 'GET'
    } else {
      if (contact.id) {
        endpoint += contact.id
        options.method = 'PUT'
      } else {
        options.method = 'POST'
      }
      options.body = JSON.stringify(contact)
    }

    const contactRes = await fetch(endpoint, options)

    if (contactRes.status !== 204) {
      try {
        contactData = await contactRes.json()
      } catch (error) {
        console.warn(error)
      }
    }
    if (!contactRes.ok) {
      console.log('Status Brevo:', contactRes.status)
      console.log('Risposta Brevo:', JSON.stringify(contactData, null, 2))
      return res
        .status(contactRes.status)
        .json({ error: contactData || 'Brevo API Error' })
    } else if (contactRes.ok && !event) {
      const { id, email, attributes } = contactData
      return res.status(200).json({ id, email, attributes })
    }

    // Send event to brevo
    if (event) {
      let endpoint = `${apiUrl}/events/`
      let options = { ...optionsInit, method: 'POST' }
      options.body = JSON.stringify(event)

      const eventRes = await fetch(endpoint, options)

      if (eventRes.status !== 204) {
        try {
          eventData = await eventRes.json()
        } catch (error) {
          console.warn(error)
        }
      }
      if (!eventRes.ok) {
        console.log('Status Brevo:', eventRes.status)
        console.log('Risposta Brevo:', JSON.stringify(eventData, null, 2))
        return res
          .status(eventRes.status)
          .json({ error: eventData || 'Brevo API Error' })
      }
    }
    return res.status(200).json(contactData)
  } catch (error) {
    console.error('Brevo Api call failded:', error)
    return res.status(500).json({ error: 'Internal server Error' })
  }
}
