import { Link } from '@nextui-org/react'

export default function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <Link href='/' color='primary' size='sm'>
        Torna alla home
      </Link>
    </div>
  )
}
