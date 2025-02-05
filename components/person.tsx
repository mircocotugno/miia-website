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

const roles = {
  interior: { icon: 'graduation-cap', text: 'studente' },
  style: { icon: 'design-nib', text: 'esttica' },
  design: { icon: 'ruler-combine', text: 'progettazione' },
  software: { icon: 'cube-dots', text: 'modellazione' },
}

export function Person({ blok }: PersonComponent) {
  const firstImage = blok.image[0]
  const secondImage = blok.image[1]
  const role = roles[blok.role]
  return (
    <Card shadow='none' className='bg-transparent border-none'>
      <CardHeader className='justify-center'>
        <Image
          src={firstImage.filename}
          alt={firstImage.alt}
          width={128}
          radius='full'
          isZoomed={true}
        />
      </CardHeader>
      <CardBody className='text-center'>
        <h4 className='font-bold leading-snug text-sm sm:text-medium md:text-lg'>
          {blok.title}
        </h4>
        {blok.role && (
          <h6 className='text-xs sm:text-sm md:text-medium'>
            <i className={`iconoir-${role.icon} font-inherit align-middle inline-block mr-1`} />
            <small className='font-medium'>{role.text}</small>
          </h6>
        )}

        {blok.description &&
          compiler(blok.description, {
            wrapper: ({ children }) => (
              <p className='text-sm align-middle'>{children}</p>
            ),
            forceWrapper: true,
            overrides: Typography,
          })}
      </CardBody>
      {!!blok.links.length && (
        <CardFooter>
          {blok.links.map((link, index) => (
            <StoryblokComponent blok={link} key={index} size='lg' />
          ))}
        </CardFooter>
      )}
    </Card>
  )
}
