import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import type { PersonProps } from '@props/types'
import { Image, Modal, ModalContent, useDisclosure } from '@heroui/react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { tv } from 'tailwind-variants'
import { YouTubeEmbed } from '@next/third-parties/google'

interface PersonComponent {
  blok: PersonProps
}

const roles = {
  interior: { icon: 'graduation-cap', text: 'studente' },
  style: { icon: 'design-nib', text: 'estetica' },
  design: { icon: 'ruler-combine', text: 'progettazione' },
  cad: { icon: 'one-point-circle', text: 'modellazione' },
  '3d': { icon: 'sphere', text: 'rendering' },
  building: { icon: 'tools', text: 'cantieristica' },
  lighting: { icon: 'light-bulb-on', text: 'illuminotecnica' },
}

const Person = ({ blok }: PersonComponent) => {
  const role = blok.role || blok.ref?.content?.role
  const video = blok.video || blok.ref?.content?.video
  const image = blok.image[0] || blok.ref?.content?.image[0]
  const title = blok.title || blok.ref?.content?.title
  const description = blok.description || blok.ref?.content?.description
  const links = blok.links || blok.ref?.content?.links

  const showElement = (e: string) =>
    !!blok?.hide ? blok.hide.includes(e) : true

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
      {image && (
        <div className={headerClasses({ hasPlayer: !!video })} onClick={onOpen}>
          {video && showElement('video') && (
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
            src={image.filename}
            alt={image.alt}
            width={'100%'}
            isZoomed={true}
          />
        </div>
      )}
      <div className={bodyClasses()}>
        {title && <h4 className={titleClasses()}>{title}</h4>}
        {role && showElement('role') && (
          <h6 className={roleClasses()}>
            <i
              className={iconClasses({ class: `iconoir-${roles[role].icon}` })}
            />
            <span>{roles[role].text}</span>
          </h6>
        )}
        {description &&
          showElement('description') &&
          compiler(description, {
            wrapper: ({ children }) => (
              <p className={textClasses()}>{children}</p>
            ),
            forceWrapper: true,
            overrides: Typography({ size: 'small' }),
          })}
        {!!links.length && showElement('links') && (
          <div className="flex items-center justify-center">
            {links.map((link, index) => (
              <StoryblokComponent blok={link} key={index} />
            ))}
          </div>
        )}
      </div>
      {!!video && isOpen && showElement('video') && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          className="max-w-none mx-auto w-auto overflow-hidden max-h-[80vh]"
          classNames={{
            wrapper: 'items-center',
            closeButton:
              'fixed top-2 md:top-4 right-2 md:right-4 text-2xl md:text-4xl text-white bg-transparent hover:bg-transparent active:bg-transparent',
          }}
        >
          <ModalContent>
            <YouTubeEmbed
              videoid={video}
              params="?rel=0&modestbranding=1&autohide=1&showinfo=0&showinfo=0&controls=0"
              width={280}
              height={500}
              style="contain:none;height:inherit;width:inherit;"
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
      'flex items-center justify-center w-full aspect-square relative cursor-pointer sm:max-w-32 min-w-32',
    iconClasses: 'text-foreground transition-all pointer-events-none',
    thumbClasses: 'absolute inset-0 rounded-full overflow-hidden z-10',
    bodyClasses: 'sm:text-center space-y-2',
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
