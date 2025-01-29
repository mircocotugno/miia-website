import type { GalleryProps } from '@props/types'
import { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'
import Image from 'next/image'

interface GalleryComponent {
  blok: GalleryProps
}

export function Gallery({ blok }: GalleryComponent) {
  const galleryLength = blok.assets.length
  const [current, setCurrent] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCurrent = (index: number) => {
    const hasNext = index + 1 < galleryLength
    setCurrent(hasNext ? index + 1 : 0)
  }

  const handleOpen = (index: number) => {
    setCurrent(index)
    onOpen()
  }

  return (
    <>
      <div className='col-span-12 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {blok.assets.map((image, index) => (
          <div
            className='max-h-28 lg:max-h-32 overflow-hidden rounded'
            key={index}
          >
            <Image
              className='w-full'
              onClick={() => handleOpen(index)}
              src={image.filename}
              alt={image.alt}
              width={240}
              height={240}
            />
          </div>
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        shadow='lg'
        size='5xl'
        backdrop='blur'
        placement='center'
        className='min-h-96'
        hideCloseButton
      >
        <ModalContent className='min-h-max'>
          {() => (
            <ModalBody className='p-0 max-h-modal overflow-scroll hide-scroolbar'>
              <Image
                src={blok.assets[current].filename}
                alt={blok.assets[current].alt}
                onClick={() => handleCurrent(current)}
                width={1280}
                height={1024}
              />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
