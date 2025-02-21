import type {
  FieldProps,
  FormProps,
  OptionProps,
  DataProps,
  FormData,
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
import { brevoApi } from '@modules/brevo'

interface FormComponent {
  blok: FormProps
  courses?: Array<OptionProps>
}

export function Form({ blok, courses }: FormComponent) {
  const form = blok.ref?.content || blok
  if (!form.fields.length || !form.message) return null

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
      const { success, error } = await brevoApi(blok.scope, _data)

      if (await success) {
        const keys = form.message.match(/{{(.*?)}}/g)
        if (keys && !!keys.length) {
          keys.forEach((string) => {
            const key = string.replace('{{', '').replace('}}', '')
            form.message = form.message.replace(string, data[key].value)
          })
        }
      }
      if (!success && !error) {
        handleReset()
      }
      setMessage(error || form.message)
      setSubmitted(success)
    } else {
      setData(_data)
    }
  }

  const handleReset = () => {
    setData(getData(form.fields))
    setSubmitted(false)

    onOpenChange()
  }

  return (
    <>
      <Button
        color='primary'
        className='font-bold text-md col-span-12 sm:col-span-6 md:col-span-3 lg:col-span-2'
        onPress={onOpen}
      >
        {form.label || 'Compila il modulo'}
      </Button>
      <Drawer size='lg' isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className='flex flex-col gap-1'>
            {form.title || 'Compila il modulo'}
          </DrawerHeader>
          <DrawerBody>
            {!submitted
              ? form.fields.map((field, index) =>
                  field.input === 'enroll' && !courses?.length ? null : (
                    <StoryblokComponent
                      blok={
                        field.input === 'enroll'
                          ? { ...field, options: courses }
                          : field
                      }
                      data={data[field.id]}
                      onChange={handleChange}
                      key={index}
                    />
                  )
                )
              : compiler(message, {
                  wrapper: null,
                  overrides: Typography,
                })}
          </DrawerBody>
          <DrawerFooter className='justify-start'>
            {!submitted && (
              <Button color='primary' onPress={() => handleSubmit()}>
                Invia
              </Button>
            )}
            <Button
              color={!submitted ? 'default' : 'primary'}
              onPress={() => handleReset()}
            >
              {!submitted ? 'Cancella' : 'Continua la navigazione'}
            </Button>
          </DrawerFooter>
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
        value:
          field.input === 'hidden'
            ? field.placeholder
            : field.input === 'multiple'
              ? []
              : null,
        required: field.required,
        error: null,
      })
  )
  return data
}
