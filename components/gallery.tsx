import { GalleryProps } from '@props/types'
import { useState } from 'react'
import {
  Image as HeroImage,
  Modal,
  ModalContent,
  useDisclosure,
} from '@heroui/react'
import { tv } from 'tailwind-variants'
import { default as NextImage } from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getImageSizes } from '@modules/formats'
import { storyblokEditable } from '@storyblok/react'

interface GalleryComponent {
  blok: GalleryProps
}

export default function Gallery({ blok }: GalleryComponent) {
  if (!blok.images.length) return null

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [current, setCurrent] = useState(0)

  const handleOpen = (index: number) => {
    setCurrent(index)
    onOpen()
  }

  const images = blok.images.map((image) => getImageSizes(image))

  const previews = images.map(({ filename, alt, id }, index) => (
    <div
      key={id}
      className={previewClasses({ size: blok.size })}
      onClick={() => handleOpen(index)}
    >
      <HeroImage
        src={filename}
        alt={alt}
        width={'100%'}
        shadow="md"
        classNames={{
          wrapper: 'm-1',
          img: imageClasses({ aspect: blok.aspect }),
        }}
      />
    </div>
  ))

  const slides = images.map(({ filename, alt, size, id }, index) => (
    <SwiperSlide className="max-w-inherith max-h-inherith rounded-xl" key={id}>
      <NextImage
        className="max-h-full max-w-full rounded-xl"
        src={filename}
        alt={alt}
        width={size.ratio > 1 ? 1440 : 768 * size.ratio}
        height={size.ratio <= 1 ? 768 : 1440 / size.ratio}
        sizes={`(max-${size.axis}:512px):256px,(max-${size.axis}:768px):512px,(max-${size.axis}:1024px):768px,(max-${size.axis}:1280px):1024px,1440px`}
      />
    </SwiperSlide>
  ))

  return (
    <>
      <div
        className={galleryClasses({
          smWidth: blok.width?.[0],
          mdWidth: blok.width?.[1],
          lgWidth: blok.width?.[2],
          xlWidth: blok.width?.[3],
        })}
        {...storyblokEditable(blok)}
      >
        {previews}
      </div>
      {blok.fullScreen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          radius="none"
          backdrop="blur"
          shadow="none"
          className="mx-auto w-auto h-auto max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-8rem)] overflow-hidden bg-transparent"
          classNames={{
            wrapper: 'items-center',
            closeButton:
              'fixed z-50 top-2 right-3 text-3xl md:top-4 md:right-4 md:text-3xl text-white bg-transparent hover:bg-transparent active:bg-transparent',
          }}
        >
          <ModalContent className="p-0">
            <div>
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                initialSlide={current}
                loop={true}
                className="items-center max-w-full max-h-full rounded-xl"
              >
                {slides}
              </Swiper>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

const galleryClasses = tv({
  base: 'flex flex-wrap items-stretch w-full col-span-12',
  variants: {
    smWidth: {
      '1/4': 'sm:col-span-3',
      '1/3': 'sm:col-span-4',
      '1/2': 'sm:col-span-6',
      '2/3': 'sm:col-span-8',
      '3/4': 'sm:col-span-9',
      '1/1': 'sm:col-span-12',
    },
    mdWidth: {
      '1/4': 'md:col-span-3',
      '1/3': 'md:col-span-4',
      '1/2': 'md:col-span-6',
      '2/3': 'md:col-span-8',
      '3/4': 'md:col-span-9',
      '1/1': 'md:col-span-12',
    },
    lgWidth: {
      '1/4': 'lg:col-span-3',
      '1/3': 'lg:col-span-4',
      '1/2': 'lg:col-span-6',
      '2/3': 'lg:col-span-8',
      '3/4': 'lg:col-span-9',
      '1/1': 'lg:col-span-12',
    },
    xlWidth: {
      '1/4': 'xl:col-span-3',
      '1/3': 'xl:col-span-4',
      '1/2': 'xl:col-span-6',
      '2/3': 'xl:col-span-8',
      '3/4': 'xl:col-span-9',
      '1/1': 'xl:col-span-12',
    },
  },
})

const previewClasses = tv({
  base: 'flex-none cursor-pointer min-w-24 w-1/6',
  variants: {
    size: {
      '1/8': 'w-1/8',
      '1/4': 'w-1/4',
      '1/2': 'w-1/2',
    },
  },
})

const imageClasses = tv({
  base: 'inset-0 object-cover rounded-md sm:rounded-xl',
  variants: {
    aspect: {
      '1/1': 'aspect-square',
      '4/3': 'aspect-4/3',
      '3/4': 'aspect-3/4',
    },
  },
})
