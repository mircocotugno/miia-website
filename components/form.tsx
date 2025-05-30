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
// import { attributes, CategoryAttribute } from '../crm/attributes'
import { useState } from 'react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { brevoApi, checkContact } from '@modules/brevo'
import { tv } from 'tailwind-variants'

interface FormComponent {
  blok: FormProps
  button?: {
    label?: string
    color?: 'default' | 'primary' | 'secondary'
    size?: 'md' | 'lg' | 'sm'
    hide?: boolean
  }
  courses?: Array<OptionProps>
  openday?: {
    date: Date
    course: string
  }
}

export default function Form({
  blok,
  button,
  courses,
  openday,
}: FormComponent) {
  const alias = blok.alias?.content
  const form = alias || blok

  if (!!alias) {
    form.list = blok.list || blok.alias?.content.list
    form.title = blok.title || blok.alias?.content.title
    form.label = blok.label || blok.alias?.content.label
    form.message = blok.message || blok.alias?.content.message
    blok.fields.forEach((field: FieldProps) => {
      const index = form.fields.findIndex(({ id }) => id === field.id)
      if (index !== -1) {
        form.fields[index] = field
      } else if (!!field.id) {
        form.fields.push(field)
      }
    })
  }

  if (!form.fields.length || !form.message) return null

  const initData: FormData = {}
  if (!!openday) {
    initData.interesse_corso = openday.course
    initData.interesse_openday = openday.date
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [isLoading, setLoading] = useState(false)
  const [isChecked, setChecked] = useState(false)
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
      setChecked(true)
      const _data = { ...data }
      _data.email.value = response.email
      _data.nome.value = response.attributes.NOME
      _data.cognome.value = response.attributes.COGNOME
      _data.sms.value = response.attributes.SMS.substring(2)

      setData(_data)
    } else {
      setChecked(false)
    }
    setLoading(false)
  }

  const handleSubmit = async () => {
    const _data = { ...data }
    Object.entries(_data).forEach(
      ([name, field]) => (_data[name].error = fieldValidation(field))
    )
    const hasError: boolean = Object.values(_data).some(
      ({ error }: DataProps): boolean => !!error
    )
    if (!hasError) {
      debugger
      const response = await brevoApi(form.list, _data)
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
    setChecked(false)

    onOpenChange()
  }

  return (
    <>
      <Button
        color={button?.color || 'primary'}
        size={button?.size || 'md'}
        className={buttonClasses({ hidden: button?.hide })}
        onPress={onOpen}
      >
        {button?.label || form.label || 'Compila il modulo'}
      </Button>
      <Drawer
        size="lg"
        isOpen={isOpen}
        onOpenChange={() => handleReset()}
        classNames={{
          closeButton: 'text-xl hover:bg-transparent active:bg-transparent',
        }}
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            {form.title || 'Compila il modulo'}
            {isChecked && !isSubmitted && (
              <p className="font-medium text-medium text-foreground-800">
                <span>Ben tornato, </span>
                <strong className="text-primary">
                  {data.nome.value} {data.cognome.value}
                </strong>
                !
              </p>
            )}
          </DrawerHeader>
          <DrawerBody className="relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-opacity-30 bg-background backdrop-blur-sm">
                <Spinner
                  label="Ricerca contatto"
                  classNames={{ label: 'text-neutral-500' }}
                />
              </div>
            )}
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
                  overrides: Typography({ theme: 'primary' }),
                })}
            {error && (
              <div className="mt-auto">
                {compiler(error, {
                  wrapper: null,
                  overrides: Typography({ error: true }),
                })}
              </div>
            )}
          </DrawerBody>
          <DrawerFooter className="justify-start">
            {!isSubmitted && (
              <Button
                color="primary"
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

function getData(fields: Array<FieldProps>, data: FormData) {
  fields.forEach(
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

const buttonClasses = tv({
  base: 'font-medium text-medium col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3',
  variants: {
    hidden: {
      true: 'hidden',
    },
  },
})
