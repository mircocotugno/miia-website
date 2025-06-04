import type { NextApiRequest, NextApiResponse } from 'next'
// import type { FormList, FormData, BrevoProps, FormArea } from '@props/types'

type BrevoRequestBody = {
  // Sostituisci con la struttura effettiva richiesta dalla tua API Brevo
  id?: number
  list: string | null
  email: string | null
  attributes: {
    [key: string]: any
  }
}

type BrevoResponse = {
  // Adatta in base alla risposta che ti aspetti da Brevo
  messageId?: string
  error?: string
}

export default async function sendBrevo(
  req: NextApiRequest,
  res: NextApiResponse<BrevoResponse>
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const token = process.env.BREVO_TOKEN
  if (!token) {
    return res
      .status(500)
      .json({ error: 'Missing Brevo API key in environment' })
  }

  // TODO: need to check this!
  //   const validation = data?.validation?.value
  // if (!!validation) return false

  try {
    const brevoRes = await fetch(
      `https://api.brevo.com/v3/contacts/${req.body?.id || ''}`,
      {
        method: req.body?.id ? 'PUT' : 'POST',
        headers: {
          'api-key': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    )

    const data = await brevoRes.json()

    if (!brevoRes.ok) {
      return res
        .status(brevoRes.status)
        .json({ error: data.message || 'Brevo API Error' })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('Brevo API call failed:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
