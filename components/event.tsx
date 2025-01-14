import { EventProsp } from '@props/types'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
} from '@nextui-org/react'

interface EventComponent {
  blok: EventProsp
  parent?: string
}

export function Event({ blok, parent }: EventComponent) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const date = new Date(blok.date)
  const day = date.toLocaleString('IT-it', { day: '2-digit' })
  const month = date.toLocaleString('IT-it', { month: 'short' })

  console.log(blok.form)

  return (
    <div className='inline-flex items-center p-4 gap-4'>
      <div className='flex items-center justify-center flex-col w-16 h-16 border-foreground border-3 rounded-lg'>
        <p className='font-bold text-2xl text-center leading-6'>{day}</p>
        <p className='font-semibold text-sm opacity-90 text-center'>{month}</p>
      </div>
      <div>
        <h4 className='font-bold text-xl'>{blok.title}</h4>
        <p className='text-small'>{blok.description}</p>
      </div>
    </div>
  )

  return (
    <>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerHeader></DrawerHeader>
        <DrawerBody></DrawerBody>
      </Drawer>
    </>
  )
}
