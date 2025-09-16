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
import { useState, useEffect, useMemo, useCallback } from 'react'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'
import { tv } from 'tailwind-variants'
import { attributes } from '@crm/attributes'
import { v4 as submitId } from 'uuid'

interface FormComponent {
  blok: FormProps
  button?: {
    label?: string
    color?: 'default' | 'primary' | 'secondary'
    size?: 'md' | 'lg' | 'sm'
    hide?: boolean
  }
  courses?: Array<OptionProps>
  openday?: Date
}

const errorMessage = `#####Ops, qualcosa è andato storto {{nome}}!
    \nSe l'errore dovesse persistere, ci contatti all'indirizzo email info@miia.it`

export default function Form({
  blok,
  button,
  courses,
  openday,
}: FormComponent) {
  // Get alias content if present, otherwise use blok
  const alias = blok.alias?.content
  const form = alias || blok

  // Merge blok.list and alias.list
  const mergedList = useMemo(() => {
    const blokList = blok.list || []
    const aliasList = alias?.list || []
    // Remove duplicates
    return Array.from(new Set([...blokList, ...aliasList]))
  }, [blok.list, alias?.list])

  // Memoize mergedFields to avoid unnecessary recalculation
  const mergedFields = useMemo(() => {
    let fields = form.fields ? [...form.fields] : []
    if (!!alias) {
      blok.fields.forEach((field: FieldProps) => {
        const index = fields.findIndex(({ id }) => id === field.id)
        if (index !== -1) {
          fields[index] = field
        } else if (!!field.id) {
          fields.push(field)
        }
      })
    } else {
      fields = blok.fields
    }
    return fields
  }, [blok.fields, form.fields, alias])

  // Memoize initData for stable reference
  const initData = useMemo(() => {
    const data: FormData = {}
    if (!!openday) {
      data.openday = openday
    }
    return data
  }, [openday])

  // Drawer state for modal form
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // Form state variables
  const [isLoading, setLoading] = useState(false)
  const [user, setUser] = useState<BrevoProps | null>(null)
  const [isSubmitted, setSubmitted] = useState(false)
  const [data, setData] = useState(
    (): FormData => getData(mergedFields, initData)
  )
  useEffect(() => {
    // Reset form data when openday changes
    setData(getData(mergedFields, initData))
  }, [openday])

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // New: Success heading title and subtitle state
  const [successTitle, setSuccessTitle] = useState('')
  const [successSubtitle, setSuccessSubtitle] = useState('')

  // Handle field changes, including validation and email check
  const handleChange = (field: DataProps) => {
    field.error = fieldValidation(field)
    setData({ ...data, [field.id]: field })
    if (field.id === 'email' && !field.error) return handleCheck(field.value)
  }

  // Check if email exists in Brevo, and prefill fields if found
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
      // Prefill fields from Brevo contact attributes
      mergedFields.forEach(({ id, input }) => {
        const ID = id.toUpperCase()
        if (typeof contact.attributes[ID] === undefined) return
        if (ID === 'EMAIL') {
          _data.email.value = contact.email
          _data.email.error = null
          return
        }
        let attribute = contact.attributes[ID]
        const value = _data[id].value
        if (ID === 'SMS') {
          _data[id].value = attribute.toString().substring(2)
        }
        if (ID === 'NOME' || ID === 'COGNOME') {
          _data[id].value = attribute
        }
        // if (input === 'select') {
        //   attribute = Array.isArray(attribute) ? attribute[0] : attribute
        // }
        // if (input === 'multiple') {
        //   const _attribute = Array.isArray(attribute) ? attribute : [attribute]
        //   const _value = Array.isArray(value) ? value : [value]
        //   attribute = [...new Set([..._attribute, ..._value])]
        // }
        // if (!contact.attributes[ID]) return
        // _data[id].value = attribute
      })
      setData(_data)
    } else {
      setUser(null)
    }
    setLoading(false)
  }

  // Handle form submission, including validation and API call
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
      _data.azione = submitId()
      const contact = getContactData(_data, user, mergedList)
      debugger
      const response = await fetch('/api/send-brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scope: user ? form.tracking : 'create',
          contact: contact,
        }),
      })

      if (response.ok) {
        setError('')
        sendGTMEvent({
          event: `submit_${form.tracking || 'contact'}_form`,
          course: _data?.area.value || _data?.corso.value,
        })
        // Set heading title and subtitle based on user existence
        setSuccessTitle(
          `${user ? 'Grazie' : 'Benvenuto'} ${_data.nome?.value || ''}!`
        )
        setSuccessSubtitle(
          user
            ? 'Abbiamo aggiornato i tuoi dati.'
            : 'La tua richiesta è stata completata con successo.'
        )
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

  // Reset form state and close drawer
  const handleReset = () => {
    setData(getData(mergedFields, initData))
    setError('')
    setMessage('')
    setSubmitted(false)
    setLoading(false)
    setUser(null)
    onOpenChange()
  }

  // Memoize parseText function to avoid recreation on each render
  const parseText = useCallback(
    (text: string) => {
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

  // Render form UI
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
            {!isSubmitted && (form.title || 'Compila il modulo')}
            {user && !isSubmitted && (
              <p className="font-medium text-medium text-foreground-800">
                <span>Ben tornato, </span>
                <strong className="text-primary">
                  {data.nome.value} {data.cognome.value}
                </strong>
                !
              </p>
            )}
            {isSubmitted && (successTitle || successSubtitle) && (
              <div className="mt-12">
                {successTitle && (
                  <h2 className="font-serif break-words text-primary text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight md:leading-tight xl:leading-none">
                    {successTitle}
                  </h2>
                )}
                {successSubtitle && (
                  <h4 className="text-xl md:text-2xl font-semibold text-foreground-700 mt-2">
                    {successSubtitle}
                  </h4>
                )}
              </div>
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
              ? mergedFields.map((field, index) =>
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
                  overrides: Typography({}),
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

// Helper: Initialize form data from fields and initial values
function getData(fields: Array<FieldProps>, initial: FormData = {}) {
  const newData: FormData = { ...initial }
  fields.forEach((field) => {
    let value
    switch (field.input) {
      case 'checkbox':
        value = !!field.placeholder
        break
      case 'enroll':
      case 'select':
      case 'multiple':
        value = field.hidden
          ? field.placeholder.split(',').map((v) => v.trim())
          : []
        break
      default:
        value = field.hidden ? field.placeholder : ''
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

// Helper: Build Brevo contact object from form data
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
    // contact.id = user.id
  } else {
    contact.listIds = list.length ? list : []
    contact.updateEnabled = true
  }

  return contact
}

// Utility: Button styling
const buttonClasses = tv({
  base: 'font-medium text-medium col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3',
  variants: {
    hidden: {
      true: 'hidden',
    },
  },
})

// Why is this version better?

// 1. **No Mutation of Props or External Objects**
//    - Instead of directly mutating `form.fields`, it creates a new array `mergedFields`.
//    - This prevents side effects and unexpected bugs, especially if `form` is reused elsewhere.

// 2. **Predictable State**
//    - All field operations (merge, update) are done on local variables, making the component's state predictable and easier to debug.

// 3. **Safer Data Flow**
//    - By always using `mergedFields` for rendering and data initialization, you avoid accidental overwrites or data loss.

// 4. **Easier Maintenance**
//    - The logic for merging fields is isolated and clear, making future changes or debugging easier.

// 5. **React Best Practices**
//    - React recommends treating props and external objects as immutable. This approach follows that guideline.

// 6. **Consistency**
//    - The same array (`mergedFields`) is used for both rendering and initializing form data, reducing the risk of mismatches.
//    - The logic for merging fields is isolated and clear, making future changes or debugging easier.

// 5. **React Best Practices**
//    - React recommends treating props and external objects as immutable. This approach follows that guideline.

// 6. **Consistency**
//    - The same array (`mergedFields`) is used for both rendering and initializing form data, reducing the risk of mismatches.
// 5. **React Best Practices**
//    - React recommends treating props and external objects as immutable. This approach follows that guideline.

// 6. **Consistency**
//    - The same array (`mergedFields`) is used for both rendering and initializing form data, reducing the risk of mismatches.
// Yes, this approach is good:
// - It separates the success title and subtitle from the main message.
// - It makes the UI clearer for the user after submission.
// - It keeps the form logic and rendering maintainable and easy to extend.
// - The code is readable and follows React best practices.
