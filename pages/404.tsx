import { useRouter } from 'next/router'
import { Link } from '@nextui-org/react'
export default function NotFound() {
  const router = useRouter()
  return (
    <div>
      <h1>Page not found {router.asPath}</h1>
      <Link href='/' color='primary' size='sm'>
        Torna alla home
      </Link>
    </div>
  )
}
