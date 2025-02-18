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
  base: 'inset-0 object-cover',
  variants: {
    aspect: {
      '1/1': 'aspect-square',
      '4/3': 'aspect-4/3',
      '3/4': 'aspect-3/4',
    },
  },
})

interface ImageSize {
  width: number
  height: number
  ratio: number
  axis: 'width' | 'height'
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

  const previews = images.map(({ filename, alt }, index) => (
    <div
      className='flex-0 max-w-32 sm:max-w-36 md:max-w-42 cursor-pointer'
      onClick={() => handleOpen(index)}
      key={index}
    >
      <HeroImage
        src={filename}
        alt={alt}
        width={128}
        shadow='md'
        classNames={{ img: classes({ aspect: blok.aspect }) }}
      />
    </div>
  ))

  const slides = images.map(({ filename, alt, size }, index) => (
    <SwiperSlide className='max-w-inherith max-h-inherith'>
      <NextImage
        className='max-h-full max-w-full w-auto h-auto mx-auto my-auto shadow-2xl rounded-xl'
        src={filename}
        alt={alt}
        width={size.ratio > 1 ? 1280 : 768 * size.ratio}
        height={size.ratio <= 1 ? 768 : 1280 / size.ratio}
        sizes={`(max-${size.axis}:512px):256px,(max-${size.axis}:768px):512px,(max-${size.axis}:1024px):768px,(max-${size.axis}:1280px):1024px,1280px`}
        style={{
          height: '100%',
          width: 'auto',
        }}
      />
    </SwiperSlide>
  ))

  return (
    <>
      <div className='flex flex-wrap gap-2 md:gap-4 items-stretch'>
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
                className='items-center max-w-[80vw] max-h-[80vh]'
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
