import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import type { PersonProps } from '@props/types'
import { Image, Modal, ModalContent, useDisclosure } from '@heroui/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { tv } from 'tailwind-variants'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { YouTubeEmbed } from '@next/third-parties/google'

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
  blok = blok.ref?.content || blok
  if (!blok.title || !blok.image || !blok.role) return null

  const role = roles[blok.role]

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    cardClasses,
    headerClasses,
    thumbClasses,
    iconClasses,
    bodyClasses,
    titleClasses,
    roleClasses,
    textClasses,
  } = classes()

  return (
    <article
      id={blok.uuid}
      className={cardClasses()}
      {...storyblokEditable(blok)}
    >
      <div
        className={headerClasses({ hasPlayer: !!blok.video })}
        onClick={onOpen}
      >
        {blok.video && (
          <i
            className={iconClasses({
              class: 'iconoir-play-solid',
              hasPlayer: true,
            })}
          />
        )}
        <Image
          classNames={{
            wrapper: thumbClasses(),
          }}
          src={blok.image[0].filename}
          alt={blok.image[0].alt}
          width={'100%'}
          isZoomed={true}
        />
      </div>
      <div className={bodyClasses()}>
        <h4 className={titleClasses()}>{blok.title}</h4>
        <h6 className={roleClasses()}>
          <i className={iconClasses({ class: `iconoir-${role.icon}` })} />
          <span>{role.text}</span>
        </h6>
        {blok.description &&
          compiler(blok.description, {
            wrapper: ({ children }) => (
              <p className={textClasses()}>{children}</p>
            ),
            forceWrapper: true,
            overrides: Typography({ size: 'small' }),
          })}
        {!!blok.links.length && (
          <div className='flex items-center justify-center'>
            {blok.links.map((link, index) => (
              <StoryblokComponent blok={link} key={index} />
            ))}
          </div>
        )}
      </div>
      {blok.video && isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          className='max-w-none mx-auto w-auto overflow-hidden max-h-[80vh]'
          classNames={{
            wrapper: 'items-center',
            closeButton:
              'fixed top-2 md:top-4 right-2 md:right-4 text-2xl md:text-4xl text-white bg-transparent hover:bg-transparent active:bg-transparent',
          }}
        >
          <ModalContent>
            <YouTubeEmbed
              videoid={blok.video}
              params='?rel=0&modestbranding=1&autohide=1&showinfo=0&showinfo=0&controls=0'
              width={280}
              height={500}
              style='contain:none;height:inherit;width:inherit;'
            />
          </ModalContent>
        </Modal>
      )}
    </article>
  )
}

const classes = tv({
  slots: {
    cardClasses:
      'col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex flex-col items-center gap-3',
    headerClasses:
      'flex items-center justify-center w-full aspect-square relative cursor-pointer',
    iconClasses: 'text-foreground transition-all pointer-events-none',
    thumbClasses: 'absolute inset-8 rounded-full overflow-hidden z-10',
    bodyClasses: 'text-center space-y-2',
    titleClasses: 'font-semibold text-xl',
    roleClasses: 'text-sm leading-none inline-flex items-center gap-2',
    textClasses: 'text-small',
  },
  variants: {
    hasPlayer: {
      true: {
        headerClasses:
          '[&_.player]:hover:opacity-100 [&_.player]:hover:translate-y-0 [&_.thumb]:hover:scale-125 ',
        iconClasses:
          'player z-30 translate-y-12 opacity-0 text-3xl text-background',
      },
    },
  },
})

export default Person
