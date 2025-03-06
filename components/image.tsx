import type { ImageProps } from '@props/types'
import { widths } from '@styles/variants'
import {
  Image as HeroImage,
  Modal,
  ModalContent,
  useDisclosure,
} from '@heroui/react'
import { tv } from 'tailwind-variants'
import { default as NextImage } from 'next/image'
import { storyblokEditable } from '@storyblok/react'

interface ImageComponent {
  blok: ImageProps
}

export default function Image({ blok }: ImageComponent) {
  if (!blok.image?.filename) return null

  const { isOpen, onOpen, onClose } = useDisclosure()

  const size = blok.image.filename
    .match(/\/(\d+)x(\d+)\//)
    ?.filter((s, i) => !!i)
    ?.map((s) => Number(s))

  const ratio = !!size && size[0] / size[1]

  let width = undefined
  let height = undefined
  let axis = 'width'

  if (!!ratio) {
    width = ratio > 1 ? 1280 : 768 * ratio
    height = ratio < 1 ? 768 : 1280 / ratio
    axis = ratio > 1 ? 'width' : 'height'
  }

  return (
    <>
      <HeroImage
        {...storyblokEditable(blok)}
        src={blok.image.filename}
        alt={blok.image.alt}
        onClick={onOpen}
        sizes={`(max-${axis}:512px):256px,(max-${axis}:768px):512px,(max-${axis}:1024px):768px,(max-${axis}:1280px):1024px,1280px`}
        classNames={{
          wrapper: wrapperClasses({
            sm: blok.width?.[0],
            md: blok.width?.[1],
            lg: blok.width?.[2],
            xl: blok.width?.[3],
          }),
          img: imageClasses({ aspect: blok.aspect }),
        }}
      />
      {blok.fullScreen && (
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
          <ModalContent className='p-0'>
            <NextImage
              src={blok.image.filename}
              alt={blok.image.alt}
              width={width}
              height={height}
              sizes={`(max-${axis}:512px):256px,(max-${axis}:768px):512px,(max-${axis}:1024px):768px,(max-${axis}:1280px):1024px,1280px`}
              fill={!ratio}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

const wrapperClasses = tv({
  base: 'flex-1 items-stretch col-span-12',
  variants: {
    sm: widths.sm,
    md: widths.md,
    lg: widths.lg,
    xl: widths.xl,
  },
})

const imageClasses = tv({
  base: 'inset-0 object-cover',
  variants: {
    aspect: {
      '1/1': 'aspect-square',
      '4/3': 'aspect-4/3',
      '3/4': 'aspect-3/4',
    },
  },
})