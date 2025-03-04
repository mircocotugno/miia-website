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
  Spinner,
} from '@heroui/react'
import { StoryblokComponent } from '@storyblok/react'
import { fieldValidation } from '@modules/validations'
import { attributes, CategoryAttribute } from '../crm/attributes'
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

  const [isLoading, setLoading] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)

  const [data, setData] = useState(
    (): FormData => getData(form.fields, initData)
  )

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (field: DataProps) => {
    field.error = fieldValidation(field)
    setData({ ...data, [field.id]: field })
    if (field.id === 'email' && !field.error) return handleCheck(field.value)
  }

  const handleCheck = async (email: string) => {
    setLoading(true)
    const response = await checkContact(email)
    if (response?.id) {
      const _data = { ...data }
      _data.email.value = response.email

      Object.entries(response.attributes).forEach(
        ([key, value]: [string, any]) => {
          key = key.toLowerCase()
          const attribute = attributes[key]
          if (key === 'sms') {
            value = value.substring(2)
          }
          if (attribute && attribute.type === 'category') {
            value = (attributes[key] as CategoryAttribute).enumeration[value]
              .label
          }
          if (Array.isArray(data[key].value)) {
            value = [value]
          }
          _data[key].value = value
        }
      )
      setData(_data)
    }
    setLoading(false)
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
    setLoading(false)

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
        onOpenChange={() => handleReset()}
        classNames={{
          closeButton: 'text-xl hover:bg-transparent active:bg-transparent',
        }}
      >
        <DrawerContent>
          <DrawerHeader className='flex flex-col gap-1'>
            {form.title || 'Compila il modulo'}
          </DrawerHeader>
          <DrawerBody className='relative'>
            {isLoading && (
              <div className='absolute inset-0 flex items-center justify-center z-20 bg-opacity-30 bg-background backdrop-blur-sm'>
                <Spinner
                  label='Ricerca contatto'
                  classNames={{ label: 'text-neutral-500' }}
                />
              </div>
            )}
            {/* {!isChecked && (
              <>
                <h5 className='font-semibold'>
                  Ti sei già messo in contatto con noi?
                </h5>
                <small>
                  Inserisci il tuo indirizzo email per caricare i tuoi dati.
                </small>
                <Input
                  id={blok.id}
                  label='Indirizzo email'
                  type='email'
                  isRequired={data.email.required}
                  errorMessage={data.email.error}
                  onValueChange={(value) =>
                    handleChange({ ...data.email, value })
                  }
                />
              </>
            )} */}
            {!isSubmitted
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
            {!isSubmitted && (
              <Button
                color='primary'
                onPress={() => handleSubmit()}
                isDisabled={isLoading}
              >
                Invia
              </Button>
            )}
            <Button
              color={!isSubmitted ? 'default' : 'primary'}
              onPress={() => handleReset()}
            >
              {!isSubmitted ? 'Cancella' : 'Continua la navigazione'}
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
              : '',
        required: field.required,
        error: null,
      })
  )
  return data
}
