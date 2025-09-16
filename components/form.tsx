import type {
  BrevoProps,
  FieldData,
  FieldProps,
  FormData_,
  FormProps,
  OptionProps,
} from '@props/types'
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  Spinner,
} from '@heroui/react'
import { StoryblokComponent } from '@storyblok/react'
import { fieldValidation } from '@modules/validations'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { tv } from 'tailwind-variants'
import type { BrevoContact, BrevoEvent } from '@pages/api/send-brevo'
import { sendGTMEvent } from '@next/third-parties/google'

const dateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}

interface FormComponent {
  blok: FormProps
  courses?: Array<OptionProps>
  openday?: FieldData
}

type FormStates = 'close' | 'open' | 'search' | 'send' | 'error' | 'done'

export default function Form({ blok, courses, openday }: FormComponent) {
  // Merge alias to root form
  const form = useMemo(() => {
    const alias = blok.alias?.content
    if (!alias) return blok
    const form = {
      title: alias.title || blok.title,
      list: [...new Set([...blok.list, ...alias.list])],
      label: alias.label || blok.label,
      message: [alias.message, blok.message].join('\n'),
      fields: [...new Set([...alias.fields, ...blok.fields])],
      tracking: alias.tracking || blok.tracking,
    }

    // Fill or remove enroll field
    const enrollIndex = form.fields.findIndex(
      (field: FieldProps) => field.input === 'enroll'
    )
    if (enrollIndex >= 0 && courses?.length) {
      form.fields[enrollIndex].options = courses
    } else {
      enrollIndex >= 0 && form.fields.splice(enrollIndex, 1)
    }

    return form
  }, [blok, blok.alias, openday])

  useEffect(() => {
    if (openday) {
      setData({ ...data, openday })
    }
  }, [openday])

  // Init Data
  const [data, setData] = useState(() => getData(form.fields))
  const [user, setUser] = useState<BrevoProps | null>(null)

  const [state, setState] = useState<FormStates>('close')

  const [message, setMessage] = useState<{
    title: string
    body: string
  } | null>(null)

  const handleChange = async (field: FieldData) => {
    field.error = fieldValidation(field)
    setData({ ...data, [field.id]: field })
    searchUser(field)
  }

  const handleSubmit = async () => {
    // Validate fields immutably
    const newData = { ...data }
    Object.entries(newData).forEach(([name, field]) => {
      newData[name] = { ...field, error: fieldValidation(field) }
    })
    const hasError = Object.values(newData).some((f) => !!f.error)

    if (!hasError) {
      setState('send')

      const eventFilterData = [
        'email',
        'nome',
        'cognome',
        'sms',
        'newsletter',
        'validation',
      ]
      const event: BrevoEvent = {
        identifiers: { email_id: newData.email.value },
        event_name: form.tracking,
        event_properties: Object.fromEntries(
          [...Object.entries(newData)]
            .filter(([name]) => !eventFilterData.includes(name))
            .map(([name, { value }]) => {
              if (Array.isArray(value)) {
                value = value.join(', ')
              }
              if (value instanceof Date) {
                value = new Date(value).toLocaleDateString('it-IT', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
              }
              return [name, value]
            })
        ),
      }
      const contactFilterData = ['email']
      const contact: BrevoContact = {
        id: user?.id,
        email: newData.email.value,
        listIds: form.list,
        attributes: Object.fromEntries(
          [...Object.entries(newData)]
            .filter(([name]) => !contactFilterData.includes(name))
            .map(([name, { value }]) => {
              const NAME = name.toUpperCase()
              if (!!user && typeof user.attributes[NAME] !== 'undefined') {
                let attribube = user.attributes[NAME]
                if (Array.isArray(attribube)) {
                  value = [...new Set([...attribube, ...value])]
                }
              }
              if (name === 'sms') {
                value = '+39' + value
              }

              return [NAME, value]
            })
        ),
      }

      const response = await fetch('/api/send-brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, event }),
      })
      if (response.ok) {
        setMessage({
          title: parceText(titles[user ? 'user' : 'new'], data),
          body: parceText(form.message, data),
        })
        setState('done')
        sendGTMEvent({
          event: `submit_${form.tracking}_form`,
        })
      } else {
        console.log(response)
        setState('error')
      }
    } else {
      setData(newData)
      setState('error')
    }
  }
  const handleReset = () => {
    setData(() => getData(form.fields))
    setUser(null)
    setMessage(null)
    setState('close')
  }

  // Utilities
  const searchUser = async (field: FieldData) => {
    if (field.id === 'email' && !field.error) {
      setState('search')
      // console.log(field.value)
      const response = await fetch('/api/send-brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: { email: field.value } }),
      })

      const responseUser = response.ok ? await response.json() : null
      setUser(responseUser)
      data.email.value = responseUser?.email || field.value
      data.email.error = field.error
      data.nome.value = responseUser?.attributes['NOME'] || ''
      data.cognome.value = responseUser?.attributes['COGNOME'] || ''
      data.sms.value =
        responseUser?.attributes['SMS'].toString().substring(2) || ''
      setData({ ...data })
      setState('open')
    }
  }
  const parceText = useCallback(
    (text: string, data: FormData_) => {
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
    },
    [data]
  )

  const { button, close, spinner, label } = classes()

  // console.log(state !== 'done')
  // console.log(form)
  console.log(user)

  return (
    <>
      <Button
        size="md"
        color="primary"
        className={button()}
        onPress={() => setState('open')}
      >
        {form.label || 'Compila il modulo'}
      </Button>
      <Drawer
        size="lg"
        isOpen={state !== 'close'}
        onOpenChange={handleReset}
        classNames={{ closeButton: close() }}
      >
        <DrawerContent>
          <DrawerHeader>{form.title || 'Titolo del modulo'}</DrawerHeader>
          <DrawerBody className="relative">
            {(state === 'search' || state === 'send') && (
              <div className={spinner()}>
                <Spinner
                  label={
                    state === 'search' ? 'Ricerca contatto' : 'Invio modulo'
                  }
                  classNames={{ label: label() }}
                />
              </div>
            )}
            {user && state === 'open' && (
              <>
                <h4 className="font-semibold text-xl">
                  Bentornato {user.attributes.NOME?.toString()}!
                </h4>
                <p>
                  Abbiamo recuperato i tuoi dati, se vuoi cambiarli consulta
                  l'email di benvenuto.
                </p>
              </>
            )}
            {state === 'done' &&
              compiler(message?.title, {
                wrapper: null,
                overrides: Typography({}),
              })}
            {state !== 'done' &&
              form.fields.map((field, index) => (
                <StoryblokComponent
                  blok={field}
                  data={data[field.id]}
                  onChange={handleChange}
                  key={index}
                />
              ))}
            {state === 'done' &&
              compiler(message?.body, {
                wrapper: null,
                overrides: Typography({}),
              })}
            {state === 'error' &&
              compiler(errors['default'], {
                wrapper: null,
                overrides: Typography({ error: true }),
              })}
          </DrawerBody>
          <DrawerFooter className="justify-start">
            {state !== 'done' && (
              <>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isDisabled={state === 'error'}
                >
                  Invia
                </Button>
                <Button color="default" onPress={handleReset}>
                  Annulla
                </Button>
              </>
            )}
            {state === 'done' && (
              <Button color="primary" onPress={handleReset}>
                Chiudi
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const getData = (fields: Array<FieldProps>) => {
  const data: FormData_ = {}
  fields.forEach(({ id, input, placeholder = '', required, hidden }) => {
    let value
    if (hidden) {
      // Always use placeholder for hidden fields
      value = input === 'select' || input === 'multiple' || input === 'enroll'
        ? placeholder.split(',').map((v) => v.trim()).filter(Boolean)
        : placeholder
    } else {
      switch (input) {
        case 'checkbox':
          value = !!placeholder
          break
        case 'enroll':
        case 'select':
        case 'multiple':
          value = []
          break
        default:
          value = ''
          break
      }
    }
    data[id] = {
      id,
      value,
      required,
      error: null,
    }
  })
  return data
}

const titles = {
  new: '###Benvenuto {{nome}}!',
  user: '###Bentornato {{nome}}!\nAbbiamo recuperato i tuoi dati.',
  done: '###Grazie {{nome}{!',
}

const errors = {
  default: '#####Si è verificato un errore, riprova più tardi',
}

const classes = tv({
  slots: {
    button:
      'font-medium text-medium col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3',
    close: 'text-xl hover:bg-transparent active:bg-transparent',
    spinner:
      'absolute inset-0 flex items-center justify-center z-20 bg-opacity-30 bg-background backdrop-blur-sm',
    label: 'text-neutral-500',
  },
})
