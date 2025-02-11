import type { PictureProps } from '@props/types'
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'
import { default as NextImage } from 'next/image'
import { Image as HeroImage } from '@nextui-org/react'
import { tv } from 'tailwind-variants'

interface PictureComponent {
  blok: PictureProps
}

const sizes = {
  sm: 128,
  md: 256,
  lg: 512,
  xl: 1024,
}

const example = `https://a.storyblok.com/f/311109/5047x3368/5c996c55e7/scrivania-progettazione.jpg`

export function Picture({ blok }: PictureComponent) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = () => (blok.preview ? onOpen() : null)

  const assetSize = blok.asset.filename
    .match(/\/(\d+)x(\d+)\//)
    ?.map((s) => parseInt(s, 10))
  const pictureWidth = blok.background ? '100%' : sizes[blok.size] || '100%'

  const wrapperClasses = tv({
    base: 'flex-1 sm:flex-0 col-span-12 w-full sm:max-h-fit',
    variants: {
      size: {
        sm: 'max-w-sm ',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
      },
      ratio: {
        square: 'aspect-square',
        portrait: 'aspect-3/4',
        landscape: 'aspect-4/3',
        circle: 'aspect-square',
      },
      zoomed: {
        true: 'max-w-fit',
      },
    },
  })

  const imageClasses = tv({
    base: 'object-cover',
    variants: {
      ratio: {
        true: 'absolute t-0 r-0 w-full h-full',
      },
    },
  })

  return (
    <>
      <HeroImage
        classNames={{
          wrapper: wrapperClasses({
            ratio: blok.ratio,
            size: blok.size,
            zoomed: blok.effect.includes('zoomed'),
          }),
          img: imageClasses({
            ratio: !!blok.ratio,
          }),
        }}
        onClick={() => handleOpen()}
        removeWrapper={blok.background}
        src={blok.asset.filename}
        alt={blok.asset.alt}
        radius={blok.ratio === 'circle' ? 'full' : 'lg'}
        width={pictureWidth}
        isBlurred={blok.effect.includes('blurred')}
        isZoomed={blok.effect.includes('zoomed')}
      />
      {blok.preview && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          shadow='lg'
          size='3xl'
          backdrop='blur'
          placement='center'
          className='min-h-2/3'
          hideCloseButton
        >
          <ModalContent className=''>
            {() => (
              <ModalBody className='p-0 overflow-scroll hide-scroolbar'>
                <NextImage
                  src={blok.asset.filename}
                  alt={blok.asset.alt}
                  width={assetSize ? assetSize[1] : 1024}
                  height={assetSize ? assetSize[2] : 768}
                />
              </ModalBody>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
