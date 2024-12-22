import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Link,
} from '@nextui-org/react'
import { CoachProps } from '@props/types'
import { compiler } from 'markdown-to-jsx'

interface CoachComponent {
  blok: CoachProps
  parent?: string
}

export function Coach({ blok }: CoachComponent) {
  return (
    <Card className='p-0' radius='sm' shadow='sm'>
      <CardHeader className='p-0'>
        <Image
          radius='none'
          removeWrapper
          src={blok.image.filename}
          alt={blok.image.alt}
          width={240}
        />
      </CardHeader>
      <CardBody className='p-1 sm:p-2 md:p-3'>
        <b>{blok.name}</b>
        <div className='max-sm:hidden max-md:line-clamp-3 text-sm'>
          {compiler(blok.about, { wrapper: null, forceWrapper: true })}
        </div>
      </CardBody>
      {!!blok.links.length && (
        <CardFooter className='p-1 sm:p-2 md:p-3'>
          {blok.links.map((item, index) => (
            <Link
              href={item.link.cached_url || item.link.url}
              target={item.link.target}
              key={index}
            >
              {item.label}
            </Link>
          ))}
        </CardFooter>
      )}
    </Card>
  )
}
