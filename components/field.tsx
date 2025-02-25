import type { FieldProps, OptionProps, DataProps } from '@props/types'
import {
  Input,
  Select,
  SelectItem,
  Checkbox,
  DatePicker,
  Textarea,
} from '@heroui/react'

interface FieldComponent {
  blok: FieldProps
  data: DataProps
  onChange: (e: any) => object
}

export default function Field(props: FieldComponent) {
  if (!props.blok.input) return null
  const Fields = fields[props.blok.input]

  return <Fields {...props} />
}

const TextField = ({ blok, data, onChange }: FieldComponent) => (
  <Input
    id={blok.id}
    label={blok.label}
    placeholder={blok.placeholder}
    type={blok.input}
    isRequired={blok.required}
    errorMessage={data.error}
    isInvalid={!!data.error}
    startContent={
      blok.input === 'tel' && (
        <div className='pointer-events-none flex items-center'>
          <span className='text-small text-neutral-400'>+39</span>
        </div>
      )
    }
    onValueChange={(value) =>
      onChange({ ...data, value: blok.id === 'sms' ? `+39${value}` : value })
    }
  />
)

const AreaField = ({ blok, data, onChange }: FieldComponent) => (
  <Textarea
    label={blok.label}
    placeholder={blok.placeholder}
    isRequired={blok.required}
    errorMessage={data.error}
    isInvalid={!!data.error}
    onValueChange={(value) => onChange({ ...data, value })}
  />
)

const CheckboxField = ({ blok, data, onChange }: FieldComponent) => (
  <Checkbox
    id={blok.id}
    isRequired={blok.required}
    color={!!data.error ? 'danger' : undefined}
    onValueChange={(value) => onChange({ ...data, value })}
    className={blok.id === 'validation' ? 'hidden' : ''}
  >
    <p
      className={`text-sm ${!!data.error ? 'text-danger' : ''} ${
        blok.required
          ? "after:content-['*'] after:text-danger after:ms-0.5"
          : ''
      }`}
    >
      {blok.label}
    </p>
    {!!data.error && (
      <small className='text-xs text-danger'>{data.error}</small>
    )}
  </Checkbox>
)

const DateField = ({ blok, data, onChange }: FieldComponent) => (
  <DatePicker
    id={blok.id}
    label={blok.label}
    isRequired={blok.required}
    showMonthAndYearPickers
    errorMessage={data.error}
    isInvalid={!!data.error}
    onChange={(value) => onChange({ ...data, value })}
  />
)

type value = Array<string> | string | null
type key = string | undefined

const getValue = (value: value, key: key) => {
  if (!key) return value
  if (Array.isArray(value)) {
    const index = value.indexOf(key)
    index === -1 ? value.push(key) : value.splice(index, 1)
    return value
  } else {
    return value !== key ? key : null
  }
}

const SelectField = ({ blok, data, onChange }: FieldComponent) => (
  <Select
    id={blok.id}
    label={blok.label}
    placeholder={blok.placeholder}
    isRequired={blok.required}
    errorMessage={data.error}
    isInvalid={!!data.error}
    selectionMode={blok.input === 'multiple' ? 'multiple' : 'single'}
    onSelectionChange={({ currentKey }) =>
      onChange({
        ...data,
        value: getValue(data.value, currentKey),
      })
    }
  >
    {getOptions(blok.options).map((option) => (
      <SelectItem className='data-[selectable=true]:focus:bg-neutral-100 data-[selectable=true]:focus:text-neutral-900 data-[selectable=true]:focus:font-medium' key={option.value} value={option.value}>
        {option.name}
      </SelectItem>
    ))}
  </Select>
)

const fields = {
  text: TextField,
  number: TextField,
  email: TextField,
  tel: TextField,
  date: DateField,
  checkbox: CheckboxField,
  area: AreaField,
  select: SelectField,
  multiple: SelectField,
  enroll: SelectField,
  openday: () => null,
  hidden: () => null,
}

const getOptions = (fieldOptions: string | Array<OptionProps>) => {
  if (typeof fieldOptions !== 'string') return fieldOptions
  const options: Array<{ name: string; value: string }> = []
  fieldOptions.split('\n').forEach((option) => {
    const [name, value] = option.split(':')
    if (name && value) {
      options.push({ name, value })
    }
  })
  return options
}
