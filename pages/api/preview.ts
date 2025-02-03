export default async function preview(req: any, res: any) {
  const { slug = '' } = req.query
  const params = req.url.split('?')

  if (req.query.secret !== process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  res.setPreviewData({})
  const previous = res.getHeader('Set-Cookie')
  previous.forEach((cookie: any, index: any) => {
    previous[index] = cookie.replace('SameSite=Lax', 'SameSite=None;Secure')
  })
  res.setHeader(`Set-Cookie`, previous)
  res.end('Preview mode enabled')

  res.redirect(`/${slug}?${params[1]}`)
}
