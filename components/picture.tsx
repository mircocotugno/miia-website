import { PictureProps } from '@props/types'
import { storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'
import { useState } from 'react'
import { default as NextImage } from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@heroui/react'

interface PictureComponent {
  blok: PictureProps
}

const defaultPictureWidth = [384, 256, 128]
const pictureWidths = {
  sm: [128],
  md: [256, 128],
  lg: [512, 384, 256, 128],
  xl: [768, 512, 384, 256, 128],
  background: [1920, 1440, 1280, 1024, 768, 512, 384],
}

const defaultPictureQuality = 70
const pictureQualities = {
  sm: 90,
  md: 80,
  lg: 60,
  xl: 50,
  background: 70,
}

export function Picture({ blok }: PictureComponent) {
  if (!blok.asset.length) return null

  if (!blok.background && blok.asset.length > 1) {
    return <Gallery blok={blok} />
  }

  const [asset] = blok.asset
  const size = blok.background ? 'background' : blok.size
  const pictureWidth = size ? pictureWidths[size] : defaultPictureWidth
  const { ratio } = getRatio(asset.filename)
  const pictureHeight = pictureWidth[0] / ratio
  const pictureQuality = size ? pictureQualities[size] : defaultPictureQuality

  const pictureSizes = getSizes(pictureWidth)
  const pictureClasses = tv({
    variants: {
      background: {
        true: 'object-cover object-center mix-blend-normal',
      },
      ratio: {
        true: 'w-full max-w-full max-h-full',
      },
    },
  })

  const containerClasses = tv({
    variants: {
      background: {
        true: 'absolute -z-20 inset-0',
        false: 'flex-0 sm:flex-1 col-span-12 sm:col-span-6 rounded-lg min-w-32',
      },
      ratio: {
        square: 'aspect-square',
        portrait: 'aspect-3/4 max-h-full',
        landscape: 'aspect-4/3 max-w-full',
        circle: 'aspect-square rounded-full overflow-hidden',
      },
      size: {
        sm: 'sm:col-span-3 rounded-sm',
        md: 'sm:col-span-4 rounded-md',
        lg: 'sm:col-span-8 rounded-xl',
        xl: 'sm:col-span-9 rounded-2xl',
      },
    },
  })

  return (
    <div
      {...storyblokEditable(blok)}
      className={containerClasses({
        background: blok.background,
        ratio: blok.ratio,
        size: blok.size,
      })}
    >
      <NextImage
        src={asset.filename}
        alt={asset.alt}
        width={blok.background ? undefined : pictureWidth[0]}
        height={blok.background ? undefined : pictureHeight}
        fill={blok.background}
        priority={true}
        sizes={pictureSizes}
        quality={pictureQuality}
        className={pictureClasses({
          background: blok.background,
          ratio: !!blok.ratio,
        })}
      />
    </div>
  )
}

const defaultThumbWidth = [128, 96, 64]
const thumbWidths = {
  sm: [64],
  md: [96, 64],
  lg: [160, 128, 96, 64],
  xl: [256, 160, 128, 96, 64],
}

const defaultThumbQuality = 50
const thumbQualities = {
  sm: 90,
  md: 80,
  lg: 60,
  xl: 50,
}

const slideWidths = {
  landscape: [1024, 768, 512, 384],
  square: [1024, 768, 512, 384],
  portrait: [768, 512, 384],
}

function Gallery({ blok }: PictureComponent) {
  const [current, setCurrent] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = (index: number) => {
    setCurrent(index)
    onOpen()
  }

  const thumbwidth = blok.size ? thumbWidths[blok.size] : defaultThumbWidth
  const thumbQuality = blok.size
    ? thumbQualities[blok.size]
    : defaultThumbQuality

  const thumbs = blok.asset.map((thumb, index) => {
    const { ratio } = getRatio(thumb.filename)
    const sizes = getSizes(thumbwidth)
    const width = ratio && ratio < 1 ? thumbwidth[0] * ratio : thumbwidth[0]
    const height = ratio && ratio > 1 ? thumbwidth[0] / ratio : thumbwidth[0]
    return (
      <NextImage
        key={index}
        src={thumb.filename}
        alt={thumb.alt}
        width={width}
        height={height}
        quality={thumbQuality}
        sizes={sizes}
        priority={true}
        onClick={() => handleOpen(index)}
      />
    )
  })

  const slides = blok.asset.map((slide, index) => {
    const { ratio, name } = getRatio(slide.filename)
    const slideSize = slideWidths[name]
    const slideSizes = getSizes(slideSize, true)
    const slideWidth = ratio && ratio < 1 ? slideSize[0] * ratio : slideSize[0]
    const slideheight = ratio && ratio > 1 ? slideSize[0] / ratio : slideSize[0]
    return (
      <SwiperSlide
        className='max-h-[80vh] flex justify-center items-center'
        key={index}
      >
        <NextImage
          src={slide.filename}
          alt={slide.alt}
          width={slideWidth}
          height={slideheight}
          sizes={slideSizes}
          quality={50}
          priority={false}
        />
      </SwiperSlide>
    )
  })

  return (
    <>
      <div
        {...storyblokEditable(blok)}
        className='col-span-12 flex flex-wrap items-center gap-4'
      >
        {thumbs}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        shadow='none'
        size='5xl'
        radius='none'
        backdrop='blur'
        placement='center'
        classNames={{
          base: 'bg-transparent sm:mx-auto my-4',
          wrapper: 'w-auto',
          closeButton:
            'fixed top-8 right-8 text-white text-2xl hover:bg-transparent active:bg-transparent bg-transparent',
        }}
      >
        <ModalContent>
          <ModalBody className='p-0'>
            <div>
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                initialSlide={current}
                loop={true}
                wrapperClass='items-center'
              >
                {slides}
              </Swiper>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function getSizes(sizes: Array<number>, background: boolean = false): string {
  return sizes
    .map((size, index) => {
      if (index) {
        return `(max-width:${size}px):${size}px`
      } else {
        return background ? '100vw' : `${size}px`
      }
    })
    .join(',')
}

interface RatioProps {
  width: number
  height: number
  ratio: number
  name: 'square' | 'portrait' | 'landscape'
}
function getRatio(filename: string): RatioProps {
  const size = filename.match(/\/(\d+)x(\d+)\//)
  if (size?.length !== 3)
    return { ratio: 1, width: 768, height: 768, name: 'square' }
  const width = Number(size[1])
  const height = Number(size[2])
  const ratio = width / height
  const name = ratio === 1 ? 'square' : ratio > 1 ? 'landscape' : 'portrait'
  return { ratio, width, height, name }
}
