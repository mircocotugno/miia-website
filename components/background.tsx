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

export default function Background({ blok }: BackgroundComponent) {
  if (!blok.image?.filename && !blok.video) return null
  const Backgrounds = backgrounds[blok.image?.filename ? 'image' : 'video']
  return <Backgrounds blok={blok} />
}

const BackgroundImage = ({ blok }: BackgroundComponent) => {
  const [width] = useDeviceSize()
  const image = getImageSizes(blok.image)
  const cropped = `/m/${Math.round((image.size.height / 4) * 3)}x${image.size.height}`
  return (
    <Fragment>
      {blok.author && (
        <p className="absolute z-30 bottom-4 right-4 text-sm">
          @{blok.author.content.title}
        </p>
      )}
      <div className="absolute -z-20 inset-0">
        <Image
          className={backgroundClasses({
            position: blok.position?.[0],
            smPosition: blok.position?.[1],
          })}
          src={width > 768 ? image.filename : image.filename + cropped}
          alt={image.alt}
          sizes="(max-width:480px):320px,(max-width:512px):480px,(max-width:768px):512px,(max-width:1024px):768px,(max-width:1240px):1024px,1440px"
          quality={60}
          priority
          fill
        />
      </div>
    </Fragment>
  )
}

const BackgroundVideo = ({ blok }: BackgroundComponent) => (
  <iframe
    {...storyblokEditable(blok)}
    className="absolute w-[177.77777778vh] h-full min-w-full min-h-[56.25vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20"
    src={`https://www.youtube-nocookie.com/embed/${blok.video}?rel=0&modestbranding=1&autohide=1&showinfo=0&mute=1&showinfo=0&controls=0&autoplay=1&loop=1&playlist=${blok.video}`}
    allow="autoplay"
    referrerPolicy="strict-origin-when-cross-origin"
    aria-hidden="true"
  />
)

const backgrounds = {
  image: BackgroundImage,
  video: BackgroundVideo,
}

const backgroundClasses = tv({
  base: 'object-cover object-center ',
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
