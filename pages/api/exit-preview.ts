export default async function exit(req, res) {
  const { slug = '' } = req.query
  res.clearPreviewData()
  const cookies = res.getHeader('Set-Cookie')
  res.setHeader(
    'Set-Cookie',
    cookies.map((cookie) =>
      cookie.replace('SameSite=Lax', 'SameSite=None;Secure')
    )
  )
  res.redirect(`/${slug}`)
}
