export default async function preview(req: any, res: any) {
  const { slug = '' } = req.query
  const params = req.url.split('?')

  if (req.query.secret !== process.env._PREVIEW_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  res.setPreviewData({})
  const cookies = res.getHeader('Set-Cookie')
  res.setHeader(
    'Set-Cookie',
    cookies.map((cookie: any) =>
      cookie.replace('SameSite=Lax', 'SameSite=None;Secure')
    )
  )

  res.redirect(`/${slug}?${params[1]}`)
}
