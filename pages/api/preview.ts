export default async function preview(req, res) {
  const { slug = '' } = req.query
  const params = req.url.split('?')

  if (req.query.secret !== process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  res.setPreviewData({})
  const cookies = res.getHeader('Set-Cookie')
  res.setHeader(
    'Set-Cookie',
    cookies.map((cookie) =>
      cookie.replace('SameSite=Lax', 'SameSite=None;Secure')
    )
  )

  res.redirect(`/${slug}?${params[1]}`)
}
