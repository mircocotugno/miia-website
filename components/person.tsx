import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import type { ImageData, PersonProps } from '@props/types'
import { Card, CardBody, CardFooter, CardHeader, Image } from '@heroui/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { tv } from 'tailwind-variants'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

interface PersonComponent {
  blok: PersonProps
}

const roles = {
  interior: { icon: 'graduation-cap', text: 'studente' },
  style: { icon: 'design-nib', text: 'estetica' },
  design: { icon: 'ruler-combine', text: 'progettazione' },
  software: { icon: 'cube-dots', text: 'modellazione' },
}

const Person = ({ blok }: PersonComponent) => {
  const person = blok.ref?.content || blok
  if (!person.title || !person.image || !person.role) return null

  const isStudent = person.role === 'interior'
  const role = roles[person.role]

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className='align-middle'>{children}</p>
  )

  return (
    <Card
      shadow='none'
      className={cardClasses({ isStudent: isStudent })}
      {...storyblokEditable(blok)}
    >
      <CardHeader
        className={`p-0 ${isStudent ? 'justify-start w-auto' : 'justify-center'}`}
      >
        <Thumb uuid={blok._uid} name={person.title} image={person.image} />
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
        {isStudent &&
          person.description &&
          compiler(person.description, {
            wrapper: Wrapper,
            forceWrapper: true,
            overrides: Typography({ size: 'small' }),
          })}
        {!isStudent &&
          person.message &&
          compiler(person.message, {
            wrapper: Wrapper,
            forceWrapper: true,
            overrides: Typography({ size: 'large' }),
          })}
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

interface ThumbComponent {
  image: Array<ImageData>
  name: string
  uuid: string
}

const Thumb = ({ uuid, image, name }: ThumbComponent) => {
  const firstImage = image[0]
  const secondImage = image[1]
  name = name.replaceAll(' ', '-')

  const video = useRef<HTMLVideoElement | null>(null)
  const wrapper = useRef(null)
  const [isPlaing, setIsPlaing] = useState(false)

  const handlePlay = () => {
    if (video.current) {
      isPlaing ? video.current.pause() : video.current.play()
    }
    setIsPlaing(!isPlaing)
  }

  const handleStop = () => {
    if (video.current) {
      video.current.pause()
    }
    setIsPlaing(false)
  }

  useOnClickOutside(wrapper, handleStop)

  return (
    <div
      id={uuid}
      ref={wrapper}
      className='realtive aspect-square w-64 h-64 flex items-center justify-center transition-all [&>i]:hover:translate-y-0 [&>i]:hover:opacity-100'
    >
      <i className={iconClasses({ isPlaing: isPlaing })} onClick={handlePlay} />
      <video
        id={uuid}
        ref={video}
        className={thumbClasses({ isPlaing: isPlaing })}
      >
        <source src={`/${name}.webm`} type='video/webm' />
      </video>
      <Image
        classNames={{ wrapper: thumbClasses({ isPlaing: !isPlaing }) }}
        src={firstImage.filename}
        alt={firstImage.alt}
        width={256}
        isZoomed={true}
      />
    </div>
  )
}

const thumbClasses = tv({
  base: 'absolute inset-0 w-64 h-64 rounded-full overflow-hidden transition-opacity',
  variants: {
    isPlaing: {
      true: 'z-20 opacity-100',
      false: 'z-10 opacity-0',
    },
  },
})

const iconClasses = tv({
  base: 'z-50 text-3xl text-white p-2 opacity-0 cursor-pointer transition-all translate-y-12',
  variants: {
    isPlaing: {
      true: 'iconoir-pause-solid',
      false: 'iconoir-play-solid',
    },
  },
})

const cardClasses = tv({
  base: 'bg-transparent border-none',
  variants: {
    isStudent: {
      true: 'col-span-12 md:col-span-8 lg:col-span-6 flex-row items-center',
      false: 'col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2',
    },
  },
})

export default Person
