import {
  Input,
  Select,
  SelectItem,
  Checkbox,
  DatePicker,
  Textarea,
} from '@nextui-org/react'
import type { FieldProps, OptionProp } from '@props/types'
import type { DataProps } from '@components/form'

interface FieldComponent {
  blok: FieldProps
  data: DataProps
  callback: (e: any) => object
}

export function Field(props: FieldComponent) {
  if (!props.blok.input) return null
  const Fields = fields[props.blok.input]

  return <Fields {...props} />
}

const TextField = ({ blok, data, callback }: FieldComponent) => (
  <Input
    id={blok.id}
    label={blok.label}
    placeholder={blok.placeholder}
    type={blok.input}
    isRequired={blok.required}
    errorMessage={data.error}
    isInvalid={!!data.error}
    onValueChange={(value) => callback({ ...data, value })}
  />
)

const AreaField = ({ blok, data, callback }: FieldComponent) => (
  <Textarea
    label={blok.label}
    placeholder={blok.placeholder}
    isRequired={blok.required}
    errorMessage={data.error}
    isInvalid={!!data.error}
    onValueChange={(value) => callback({ ...data, value })}
  />
)

const CheckboxField = ({ blok, data, callback }: FieldComponent) => (
  <Checkbox
    id={blok.id}
    isRequired={blok.required}
    color={!!data.error ? 'danger' : undefined}
    onValueChange={(value) => callback({ ...data, value })}
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

const DateField = ({ blok, data, callback }: FieldComponent) => (
  <DatePicker
    id={blok.id}
    label={blok.label}
    isRequired={blok.required}
    showMonthAndYearPickers
    errorMessage={data.error}
    isInvalid={!!data.error}
    onChange={(value) => callback({ ...data, value })}
  />
)

const SelectField = ({ blok, data, callback }: FieldComponent) => (
  <Select
    id={blok.id}
    label={blok.label}
    placeholder={blok.placeholder}
    isRequired={blok.required}
    errorMessage={data.error}
    isInvalid={!!data.error}
    onSelectionChange={({ currentKey }) =>
      callback({
        ...data,
        value: currentKey !== data.value ? currentKey : null,
      })
    }
  >
    {getOptions(blok.options).map((option, index) => (
      <SelectItem key={option.value} value={option.value}>
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
  enroll: SelectField,
  hidden: () => null,
}

const getOptions = (fieldOptions: string | Array<OptionProp>) => {
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
