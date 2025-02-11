import type {
  FieldProps,
  FormProps,
  OptionProps,
  DataProps,
  StoryProps,
} from '@props/types'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Button,
} from '@heroui/react'
import { StoryblokComponent } from '@storyblok/react'
import { fieldValidation } from '@modules/validations'
import { useState } from 'react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'

interface FormComponent {
  blok: FormProps
  courses?: Array<OptionProps>
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

interface FormData {
  [key: string]: DataProps
}

export function Form({ blok, courses }: FormComponent) {
  const form = blok.ref?.content || blok
  if (!form.scope || !form.fields.length || !form.message) return null

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [data, setData] = useState((): FormData => getData(form.fields))
  const [message, setMessage] = useState(form.message)
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

      const keys = form.message.match(/{{(.*?)}}/g)

      if (keys && !!keys.length) {
        keys.forEach((string) => {
          const key = string.replace('{{', '').replace('}}', '')
          blok.message = form.message.replace(string, data[key].value)
        })
      }

      if (await responce) {
        setMessage(form.message)
        setSubmitted(true)
      }
    } else {
      setData(_data)
    }
  }

  const handleReset = () => {
    setData(() => getData(blok.fields))
    setSubmitted(false)

    onOpenChange()
  }

  return (
    <>
      <Button color='primary' className='font-bold text-md col-span-12 sm:col-span-6 md:col-span-3 lg:col-span-2' onPress={onOpen}>
        {callToAction[form.scope]}
      </Button>
      <Drawer size='lg' isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {!submitted ? (
            <>
              <DrawerHeader className='flex flex-col gap-1'>
                {!!blok.scope && formTitles[blok.scope]}
              </DrawerHeader>
              <DrawerBody>
                {blok.fields.map((field, index) =>
                  field.input === 'enroll' && !courses?.length ? null : (
                    <StoryblokComponent
                      blok={
                        field.input === 'enroll'
                          ? { ...field, options: courses }
                          : field
                      }
                      data={data[field.id]}
                      callback={handleChange}
                      key={index}
                    />
                  )
                )}
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
                {compiler(message, {
                  wrapper: null,
                  overrides: Typography,
                })}
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
