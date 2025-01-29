import type { PersonProps, StoryProps } from '@props/types'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@nextui-org/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { StoryblokComponent } from '@storyblok/react'

interface PersonComponent {
  blok: PersonProps
  story: StoryProps
}

export function Person({ blok }: PersonComponent) {
  const firstImage = blok.image[0]
  const secondImage = blok.image[1]
  return (
    <Card>
      <CardHeader className='justify-center'>
        <Image
          src={firstImage.filename}
          alt={firstImage.alt}
          width={'100%'}
          // className='aspect-square rounded-full'
        />
      </CardHeader>
      <CardBody>
        <h4 className='font-bold leading-snug text-2xl'>{blok.title}</h4>
        {blok.description &&
          compiler(blok.description, {
            wrapper: ({ children }) => <p className='text-sm'>{children}</p>,
            forceWrapper: true,
            overrides: Typography,
          })}
      </CardBody>
      <CardFooter>
        {blok.links.map((link, index) => (
          <StoryblokComponent blok={link} key={index} size='lg' />
        ))}
      </CardFooter>
    </Card>
  )
}
