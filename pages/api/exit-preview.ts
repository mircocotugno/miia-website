export default async function exit(req: any, res: any) {
  const { slug = '' } = req.query
  res.clearPreviewData()
  const previous = res.getHeader('Set-Cookie')
  previous.forEach((cookie: any, index: any) => {
    previous[index] = cookie.replace('SameSite=Lax', 'SameSite=None;Secure')
  })
  res.setHeader(`Set-Cookie`, previous)
  res.end('Preview mode enabled')

  res.redirect(`/${slug}`)
}
