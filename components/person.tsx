import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import type { PersonProps } from '@props/types'
import { Card, CardBody, CardFooter, CardHeader, Image } from '@heroui/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { tv } from 'tailwind-variants'

interface PersonComponent {
  blok: PersonProps
}

const roles = {
  interior: { icon: 'graduation-cap', text: 'studente' },
  style: { icon: 'design-nib', text: 'estetica' },
  design: { icon: 'ruler-combine', text: 'progettazione' },
  software: { icon: 'cube-dots', text: 'modellazione' },
}

export default function Person({ blok }: PersonComponent) {
  const person = blok.ref?.content || blok
  if (!person.title || !person.image || !person.role) return null

  const isStudent = person.role === 'interior'

  const firstImage = person.image[0]
  const secondImage = person.image[1]
  const role = roles[person.role]

  const description =
    person.description &&
    compiler(person.description, {
      wrapper: ({ children }) => <p className='align-middle'>{children}</p>,
      forceWrapper: true,
      overrides: Typography({ size: 'small' }),
    })

  const message =
    person.message &&
    compiler(person.message, {
      wrapper: ({ children }) => (
        <p className='align-middle leading-relaxed'>{children}</p>
      ),
      forceWrapper: true,
      overrides: Typography({ size: 'large' }),
    })

  return (
    <Card
      shadow='none'
      className={cardClasses({ isStudent: isStudent })}
      {...storyblokEditable(blok)}
    >
      <CardHeader
        className={isStudent ? 'justify-start w-auto' : 'justify-center'}
      >
        <Image
          src={firstImage.filename}
          alt={firstImage.alt}
          width={128}
          radius='full'
          isZoomed={true}
        />
      </CardHeader>
      <CardBody
        as={'article'}
        className={isStudent ? 'text-left' : 'text-center'}
      >
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
        {isStudent ? message : description}
      </CardBody>
      {!isStudent && !!person.links.length && (
        <CardFooter>
          {person.links.map((link, index) => (
            <StoryblokComponent blok={link} key={index} size='lg' />
          ))}
        </CardFooter>
      )}
    </Card>
  )
}

const cardClasses = tv({
  base: 'bg-transparent border-none',
  variants: {
    isStudent: {
      true: 'col-span-12 md:col-span-8 lg:col-span-6 flex-row items-center',
      false: 'col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2',
    },
  },
})
