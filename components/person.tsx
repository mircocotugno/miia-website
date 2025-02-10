import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
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

interface PersonComponent {
  blok: PersonProps
}

const roles = {
  interior: { icon: 'graduation-cap', text: 'studente' },
  style: { icon: 'design-nib', text: 'estetica' },
  design: { icon: 'ruler-combine', text: 'progettazione' },
  software: { icon: 'cube-dots', text: 'modellazione' },
}

export function Person({ blok }: PersonComponent) {
  const person = blok.ref?.content || blok
  if (!person.title || !person.image || !person.role) return null

  const firstImage = person.image[0]
  const secondImage = person.image[1]
  const role = roles[person.role]

  return (
    <Card
      shadow='none'
      className='bg-transparent border-none col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2'
      {...storyblokEditable(blok)}
    >
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
          {person.title}
        </h4>
        {person.role && (
          <h6 className='text-xs sm:text-sm md:text-medium'>
            <i
              className={`iconoir-${role.icon} font-inherit align-middle inline-block mr-1`}
            />
            <small className='font-medium'>{role.text}</small>
          </h6>
        )}

        {person.description &&
          compiler(person.description, {
            wrapper: ({ children }) => (
              <p className='text-sm align-middle'>{children}</p>
            ),
            forceWrapper: true,
            overrides: Typography,
          })}
      </CardBody>
      {!!person.links.length && (
        <CardFooter>
          {person.links.map((link, index) => (
            <StoryblokComponent blok={link} key={index} size='lg' />
          ))}
        </CardFooter>
      )}
    </Card>
  )
}
