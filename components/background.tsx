import type { BackgroundProps } from '@props/types'
import { storyblokEditable } from '@storyblok/react'
import { useDeviceSize } from '@modules/interface'
import Image from 'next/image'
import { getImageSizes } from '@modules/formats'
import { tv } from 'tailwind-variants'
import { Fragment } from 'react'

interface BackgroundComponent {
  blok: BackgroundProps
}

const storyblokLoader = ({ src, width, quality }: any) => {
  return `${src}/m/${width}x0/filters:quality(${quality || 60})`
}

export default function Background({ blok }: BackgroundComponent) {
  if (!blok.image?.filename && !blok.video) return null

  return blok.video ? (
    <BackgroundWithVideo blok={blok} />
  ) : (
    <BackgroundImage blok={blok} />
  )
}

const BackgroundWithVideo = ({ blok }: BackgroundComponent) => {
  const [width] = useDeviceSize()
  const image = getImageSizes(blok.image)

  const isMobile = width <= 768

  return (
    <Fragment>
      {blok.author && (
        <p className="absolute z-30 bottom-4 right-4 text-xs py-1 px-2 bg-background bg-opacity-75 rounded-full">
          @{blok.author.content.title}
        </p>
      )}

      <div className="absolute inset-0 -z-20">
        {isMobile ? (
          <Image
            loader={storyblokLoader}
            src={image.filename}
            alt={image.alt || 'immagine di sfondo'}
            fill
            sizes="100vw"
            quality={60}
            loading="lazy"
            placeholder="empty"
            className={backgroundClasses({
              position: blok.position?.[0],
              smPosition: blok.position?.[1],
            })}
          />
        ) : (
          <iframe
            {...storyblokEditable(blok)}
            className="absolute w-[177.77777778vh] h-full min-w-full min-h-[56.25vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            src={`https://www.youtube-nocookie.com/embed/${blok.video}?rel=0&modestbranding=1&autohide=1&controls=0&mute=1&autoplay=1&loop=1&playlist=${blok.video}`}
            allow="autoplay"
            referrerPolicy="strict-origin-when-cross-origin"
            aria-hidden="true"
          />
        )}
      </div>
    </Fragment>
  )
}

const BackgroundImage = ({ blok }: BackgroundComponent) => {
  const [width] = useDeviceSize()
  const image = getImageSizes(blok.image)

  return (
    <Fragment>
      {blok.author && (
        <p className="absolute z-30 bottom-4 right-4 text-xs py-1 px-2 bg-background bg-opacity-75 rounded-full">
          @{blok.author.content.title}
        </p>
      )}
      <div className="absolute inset-0 -z-20">
        <Image
          loader={storyblokLoader}
          src={image.filename}
          alt={image.alt || 'immagine di sfondo'}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          quality={60}
          loading="lazy"
          placeholder="empty"
          className={backgroundClasses({
            position: blok.position?.[0],
            smPosition: blok.position?.[1],
          })}
          priority={width > 768}
        />
      </div>
    </Fragment>
  )
}

const backgroundClasses = tv({
  base: 'object-cover object-center',
  variants: {
    position: {
      right: 'object-right',
      center: 'object-center',
      left: 'object-left',
    },
    smPosition: {
      right: 'sm:object-right',
      center: 'sm:object-center',
      left: 'sm:object-left',
    },
  },
})
