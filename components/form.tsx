import type { FieldProps, FormProps } from '@props/types'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Button,
} from '@nextui-org/react'
import { StoryblokComponent } from '@storyblok/react'
import { fieldValidation } from '@modules/validations'
import { useState } from 'react'
import { Content } from '@components/content'

interface FormComponent {
  blok: FormProps
}

const formTitles = {
  contact: 'Richiesta informazioni',
  openday: "Partecipazione all'openday",
  enroll: 'Iscrizione al corso',
}

const callToAction = {
  contact: 'Contattaci',
  openday: 'Partecipa',
  enroll: 'Iscriviti',
}

export type DataProps = {
  id: string
  value: any
  required: boolean
  error: string | null
}

interface FormData {
  [key: string]: DataProps
}

export function Form({ blok }: FormComponent) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [data, setData] = useState((): FormData => getData(blok.body))
  const [message, setMessage] = useState(blok.message)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: DataProps) => {
    field.error = fieldValidation(field)
    setData({ ...data, [field.id]: field })
  }

  const handleSubmit = async () => {
    const _data = { ...data }
    Object.values(_data).forEach(
      (field: DataProps) => (_data[field.id].error = fieldValidation(field))
    )
    const hasError: boolean = Object.values(_data).some(
      ({ error }: DataProps): boolean => !!error
    )
    if (!hasError) {
      const responce = async () => await (Math.random() % 2 == 0)

      const keys = blok.message.match(/{{(.*?)}}/g)

      if (keys && !!keys.length) {
        keys.forEach((string) => {
          const key = string.replace('{{', '').replace('}}', '')
          blok.message = blok.message.replace(string, data[key].value)
        })
      }

      if (await responce) {
        setMessage(blok.message)
        setSubmitted(true)
      }
    } else {
      setData(_data)
    }
  }

  const handleReset = () => {
    setData(() => getData(blok.body))
    setSubmitted(false)

    onOpenChange()
  }

  return (
    <>
      <Button color='primary' onPress={onOpen}>
        {callToAction[blok.scope]}
      </Button>
      <Drawer size='lg' isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {!submitted ? (
            <>
              <DrawerHeader className='flex flex-col gap-1'>
                {!!blok.scope && formTitles[blok.scope]}
              </DrawerHeader>
              <DrawerBody>
                {blok.body.map((field, index) => (
                  <StoryblokComponent
                    blok={field}
                    data={data[field.id]}
                    callback={handleChange}
                    key={index}
                  />
                ))}
              </DrawerBody>
              <DrawerFooter className='justify-start'>
                <Button color='primary' onPress={() => handleSubmit()}>
                  Invia
                </Button>
                <Button onPress={() => handleReset()}>Cancella</Button>
              </DrawerFooter>
            </>
          ) : (
            <>
              <DrawerHeader className='flex flex-col gap-1'>
                {!!blok.scope && formTitles[blok.scope]}
              </DrawerHeader>
              <DrawerBody>
                <Content blok={{ body: message }} />
              </DrawerBody>
              <DrawerFooter className='justify-start'>
                <Button color='primary' onPress={() => handleReset()}>
                  Continua la navigazione
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

function getData(body: Array<FieldProps>) {
  const data: FormData = {}
  body.forEach(
    (field) =>
      (data[field.id] = {
        id: field.id,
        value: field.input === 'hidden' ? field.placeholder : null,
        required: field.required,
        error: null,
      })
  )
  return data
}
