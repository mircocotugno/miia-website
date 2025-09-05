import type {
  FieldProps,
  FormProps,
  OptionProps,
  DataProps,
  FormData,
  BrevoProps,
  FormList,
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
import { sendGTMEvent } from '@next/third-parties/google'
import { useState, useEffect } from 'react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { tv } from 'tailwind-variants'
import { attributes } from '@crm/attributes'

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

const errorMessage = `#####Ops, qualcosa è andato storto {{nome}}!
    \nSe l'errore dovesse persistere, ci contatti all'indirizzo email info@miia.it`

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
    form.tracking = blok.tracking || blok.alias?.content.tracking
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
  const [user, setUser] = useState<BrevoProps | null>(null)
  const [isSubmitted, setSubmitted] = useState(false)

  const [data, setData] = useState(
    (): FormData => getData(form.fields, initData)
  )

  useEffect(() => {
    setData(getData(form.fields, initData))
  }, [openday])

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (field: DataProps) => {
    field.error = fieldValidation(field)
    console.log(field)
    setData({ ...data, [field.id]: field })
    if (field.id === 'email' && !field.error) return handleCheck(field.value)
  }

  const handleCheck = async (email: string) => {
    setLoading(true)
    const response = await fetch('/api/send-brevo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scope: 'find', contact: { email } }),
    })

    if (response.ok) {
      const contact: BrevoProps = await response.json()
      setUser(contact)
      const _data = { ...data }

      form.fields.forEach(({ id }) => {
        const attribute = id.toUpperCase()
        if (typeof contact.attributes[attribute] === undefined) return
        if (attribute === 'EMAIL') {
          _data.email.value = contact.email
          _data.email.error = null
          return
        }
        let value = contact.attributes[attribute]
        if (attribute === 'SMS') {
          value = value.toString().substring(2)
        }
        if (!contact.attributes[attribute]) return
        _data[id].value = value
      })

      setData(_data)
    } else {
      setUser(null)
      setData((): FormData => getData(form.fields, initData))
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
      setLoading(true)
      const contact = getContactData(_data, user, form.list)
      console.log(contact)

      const response = await fetch('/api/send-brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scope: user ? 'update' : 'create',
          contact: contact,
        }),
      })

      // if (!response.ok) return handleReset()
      const parseText = (text: string) => {
        const keys = text.match(/{{(.*?)}}/g)
        if (keys && !!keys.length) {
          keys.forEach((string) => {
            const key = string.replace('{{', '').replace('}}', '')
            if (!data[key]?.value) return text
            let value = data[key].value
            if (!Number.isNaN(new Date(value).valueOf())) {
              value = new Date(value).toLocaleDateString('it-IT')
            }
            text = text.replace(string, value)
          })
        }
        return text
      }

      if (response.ok) {
        setError('')

        sendGTMEvent({
          event: `submit_${form.tracking || 'contact'}_form`,
          course: _data?.interesse_corso.value || _data?.iscrizione_corso.value,
        })

        setMessage(parseText(form.message))
        setLoading(false)
      } else {
        setError(parseText(errorMessage))
        setLoading(false)
      }
      setSubmitted(response.ok)
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
    setUser(null)

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
            {user && !isSubmitted && (
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

function getData(fields: Array<FieldProps>, initial: FormData = {}) {
  const newData: FormData = { ...initial }
  fields.forEach((field) => {
    let value
    switch (field.input) {
      case 'hidden':
        value = field.placeholder
        break
      case 'checkbox':
        value = !!field.placeholder
        break
      default:
        value = ['select', 'multiple', 'enroll'].includes(field.input) ? [] : ''
        break
    }
    newData[field.id] = {
      id: field.id,
      value: value,
      required: field.required,
      error: null,
    }
  })
  return newData
}

function getContactData(
  data: FormData,
  user: null | BrevoProps,
  list: FormList
) {
  const contact: BrevoProps = {
    attributes: {},
  }

  Object.entries(data).forEach(([key, field]) => {
    if (key === 'email') {
      return (contact.email = field.value)
    }
    let value = field.value
    const type =
      typeof attributes[key] !== 'undefined' ? attributes[key].type : null
    if (type === 'multiple-choice') {
      value = typeof field.value === 'string' ? [field.value] : field.value
    } else if (type === 'date') {
      value = new Date(field.value).toISOString().split('T', 1)[0]
    } else if (key === 'sms') {
      value = `+39${field.value}`
    }
    return (contact.attributes[key.toUpperCase()] = value)
  })

  if (user) {
    contact.id = user.id
  }

  contact.listIds = list.length ? list : [19]

  contact.updateEnabled = true

  return contact
}

const buttonClasses = tv({
  base: 'font-medium text-medium col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3',
  variants: {
    hidden: {
      true: 'hidden',
    },
  },
})
