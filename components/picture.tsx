import type { PictureProps } from '@props/types'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@heroui/react'
import { default as NextImage } from 'next/image'
import { Image as HeroImage } from '@heroui/react'
import { tv } from 'tailwind-variants'

interface PictureComponent {
  blok: PictureProps
}

const widths = {
  sm: 128,
  md: 256,
  lg: 512,
  xl: 1024,
}
// `(max-width:640px) px,(max-width:768px) px,(max-width: 1024px) px,(max-width: 1280px) px, px`
const sizes = [480, 640, 768, 1024, 1280]

const example = `https://a.storyblok.com/f/311109/5047x3368/5c996c55e7/scrivania-progettazione.jpg`

export function Picture({ blok }: PictureComponent) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = () => (blok.preview ? onOpen() : null)

  const asset = blok.asset.filename
    .match(/\/(\d+)x(\d+)\//)
    ?.map((s) => parseInt(s, 10))
  asset?.length && asset.shift()
  const width = widths[blok.size] || '100%'

  // const ratio = asset && asset[0] / asset[1]

  // if (blok.size && ratio) {
    //   console.log('ratio: ' + ratio)
  //   console.log('width: ' + width)
  //   console.log('height: ' + widths[blok.size] / ratio)
  //   console.log('sizes: ')
  // }

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

  if (blok.background) {
    return (
      <>
        {blok?.author && (
          <span className='text-bold text-sm absolute bottom-4 left-8 z-10'>
            <small>@</small> {blok.author.content.title}
          </span>
        )}
        <NextImage
          sizes='(max-width:480px) 480px,(max-width:640px) 640px,(max-width:768px) 768px,(max-width: 1024px) 1024px,(max-width: 1280px) 1280px, 100vw'
          className='object-cover object-center -z-20 mix-blend-normal'
          src={blok.asset.filename}
          alt={blok.asset.alt}
          priority={true}
          quality={60}
          fill
        />
      </>
    )
  }

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
        width={width}
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
                  width={asset ? asset[1] : 1024}
                  height={asset ? asset[2] : 768}
                />
              </ModalBody>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
