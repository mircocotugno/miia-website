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

interface GalleryComponent {
  blok: GalleryProps
}

const classes = tv({
  base: 'inset-0 object-cover rounded-md sm:rounded-xl',
  variants: {
    aspect: {
      '1/1': 'aspect-square',
      '4/3': 'aspect-4/3',
      '3/4': 'aspect-3/4',
    },
  },
})

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
      className='flex-none sm:flex-none w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer'
      onClick={() => handleOpen(index)}
    >
      <HeroImage
        src={filename}
        alt={alt}
        width={'100%'}
        shadow='md'
        classNames={{wrapper:"m-1", img: classes({ aspect: blok.aspect }) }}
      />
    </div>
  ))

  const slides = images.map(({ filename, alt, size, id }, index) => (
    <SwiperSlide className='max-w-inherith max-h-inherith' key={id}>
      <NextImage
        className='max-h-full max-w-full w-auto h-auto mx-auto my-auto rounded-xl'
        src={filename}
        alt={alt}
        width={size.ratio > 1 ? 1280 : 768 * size.ratio}
        height={size.ratio <= 1 ? 768 : 1280 / size.ratio}
        sizes={`(max-${size.axis}:512px):256px,(max-${size.axis}:768px):512px,(max-${size.axis}:1024px):768px,(max-${size.axis}:1280px):1024px,1280px`}
      />
    </SwiperSlide>
  ))

  return (
    <>
      <div className='flex flex-wrap items-stretch w-full'>
        {previews}
      </div>
      {blok.fullScreen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          radius='none'
          backdrop='blur'
          shadow='none'
          className='mx-auto w-auto h-auto max-w-[80vw] max-h-[80vh] overflow-hidden bg-transparent'
          classNames={{
            wrapper: 'items-center',
            closeButton:
              'fixed top-2 right-3 text-3xl md:top-4 md:right-4 md:text-3xl text-white bg-transparent hover:bg-transparent active:bg-transparent',
          }}
        >
          <ModalContent className='p-0'>
            <div>
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                initialSlide={current}
                loop={true}
                className='items-center max-w-[80vw] max-h-[80vh] rounded-xl'
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
