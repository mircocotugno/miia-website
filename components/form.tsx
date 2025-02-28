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
import { brevoApi, checkContact } from '@modules/brevo'

interface FormComponent {
  blok: FormProps
  courses?: Array<OptionProps>
  openday?: DataProps
}

export default function Form({ blok, courses, openday }: FormComponent) {
  const form = blok.ref?.content || blok
  if (!form.fields.length || !form.message) return null

  const initData: FormData = {}
  if (openday) {
    initData.openday = openday
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [data, setData] = useState(
    (): FormData => getData(form.fields, initData)
  )
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: DataProps) => {
    debugger
    const hasError = fieldValidation(field)
    field.error = hasError
    if (!hasError && field.id === 'email') {
      handleCheck(field.value)
    }

    setData({ ...data, [field.id]: field })
  }

  const handleCheck = async (email: string) => {
    const response = await checkContact(email)
    // debugger
    // TODO if the exist contact? Need to find a UI bahviours
    if (response?.id) {
      const _data = { ...data }
      _data.nome.value = response.attributes['NOME']
      setData(_data)
    }
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
      const response = await brevoApi(form.scope, _data)
      if (!response) return handleReset()

      const parseText = (text: string) => {
        const keys = text.match(/{{(.*?)}}/g)
        if (keys && !!keys.length) {
          keys.forEach((string) => {
            const key = string.replace('{{', '').replace('}}', '')
            if (!data[key]?.value) return text
            text = text.replace(string, data[key].value)
          })
        }
        return text
      }

      if (response.success) {
        setError('')
        setMessage(parseText(form.message))
      } else if (response.error) {
        setError(parseText(response.error))
      }
      setSubmitted(response.success)
    } else {
      setData(_data)
    }
  }

  const handleReset = () => {
    setData(getData(form.fields, initData))
    setError('')
    setMessage('')
    setSubmitted(false)

    onOpenChange()
  }

  return (
    <>
      <Button
        color='primary'
        className='font-bold text-md col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'
        size='lg'
        onPress={onOpen}
      >
        {form.label || 'Compila il modulo'}
      </Button>
      <Drawer
        size='lg'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          closeButton: 'text-xl hover:bg-transparent active:bg-transparent',
        }}
      >
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
            {error && (
              <div className='text-danger mt-auto'>
                {compiler(error, {
                  wrapper: null,
                  overrides: Typography,
                })}
              </div>
            )}
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

function getData(body: Array<FieldProps>, data: FormData) {
  body.forEach(
    (field) =>
      (data[field.id] = {
        id: field.id,
        value:
          field.input === 'hidden'
            ? field.placeholder
            : ['select', 'multiple', 'enroll'].includes(field.input)
              ? []
              : null,
        required: field.required,
        error: null,
      })
  )
  return data
}
