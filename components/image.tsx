import type { ImageProps } from '@props/types'
import {
  Image as Preview,
  Modal,
  ModalContent,
  useDisclosure,
} from '@heroui/react'
import { tv } from 'tailwind-variants'
import { default as Complete } from 'next/image'

interface ImageComponent {
  blok: ImageProps
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
    width = ratio > 1 ? 1240 : 768 * ratio
    height = ratio < 1 ? 768 : 1240 / ratio
    axis = ratio > 1 ? 'width' : 'height'
  }

  return (
    <>
      <Preview
        src={blok.image.filename}
        alt={blok.image.alt}
        onClick={onOpen}
        sizes={`(max-${axis}:512px):256px,(max-${axis}:768px):512px,(max-${axis}:1024px):768px,(max-${axis}:1280px):1024px,1280px`}
        classNames={{ img: classes({ aspect: blok.aspect }) }}
      />
      {blok.fullScreen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          className='max-w-none mx-auto w-auto overflow-hidden max-h-[80vh]'
          classNames={{
            wrapper: 'items-center',
            closeButton:
              'fixed top-4 right-4 text-3xl text-white bg-transparent hover:bg-transparent active:bg-transparent',
          }}
        >
          <ModalContent className='p-0'>
            <Complete
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
