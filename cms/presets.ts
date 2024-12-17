import type { StoryblokPreset } from '@props/schema'

const fieldName: StoryblokPreset = {
  name: 'Nome',
  component_id: 'field',
  preset: {
    id: 'name',
    input: 'text',
    label: 'Nome',
    required: true,
    placeholder: 'Mario',
  },
}
const fieldSurname: StoryblokPreset = {
  name: 'Cognome',
  component_id: 'field',
  preset: {
    id: 'surname',
    input: 'text',
    label: 'Cognome',
    required: true,
    placeholder: 'Rossi',
  },
}
const fieldFullname: StoryblokPreset = {
  name: 'Nome completo',
  component_id: 'field',
  preset: {
    id: 'full_name',
    input: 'text',
    label: 'Nome e congnome',
    placeholder: 'Mario Rossi',
    required: true,
  },
}
const fieldBirthday: StoryblokPreset = {
  name: 'Data di nascita',
  component_id: 'field',
  preset: {
    id: 'birthday',
    input: 'date',
    label: 'Data di nascita',
  },
}
const fieldGender: StoryblokPreset = {
  name: 'Sesso',
  component_id: 'field',
  preset: {
    id: 'gender',
    input: 'select',
    label: 'Sesso',
    options: 'male:Maschile\nfemale:Femminile\nother:Altro',
  },
}
const fieldBornIn: StoryblokPreset = {
  name: 'Luogo di nascita',
  component_id: 'field',
  preset: {
    id: 'born_in',
    input: 'text',
    label: 'Luogo di nascita',
    placeholder: 'Roma',
    required: true,
  },
}
const fieldEmail: StoryblokPreset = {
  name: 'Indirizzo email',
  component_id: 'field',
  preset: {
    id: 'email',
    input: 'text',
    label: 'Indirizzo email',
    placeholder: 'mario.rossi@email.com',
    required: true,
  },
}
const fieldPhone: StoryblokPreset = {
  name: 'Telefono',
  component_id: 'field',
  preset: {
    id: 'phone',
    input: 'tel',
    label: 'Numero di telefono',
    placeholder: '999 99 99 999',
    required: true,
  },
}
const fieldPec: StoryblokPreset = {
  name: 'Indirizzo posta certificata',
  component_id: 'field',
  preset: {
    id: 'pec',
    input: 'email',
    label: 'Indirizzo posta certificata',
    placeholder: 'mario.rossi@pec.com',
    condition:
      'tax_framework:freelance\ntax_framework:snc\ntax_framework:sas\ntax_framework:srl',
    required: true,
  },
}
const fieldCompany: StoryblokPreset = {
  name: 'Ragione fiscale',
  component_id: 'field',
  preset: {
    id: 'company',
    input: 'text',
    label: 'Ragione sociale',
    placeholder: 'mario rossi architetto',
    condition:
      'tax_framework:freelance\ntax_framework:snc\ntax_framework:sas\ntax_framework:srl',
    required: true,
  },
}
const fieldVat: StoryblokPreset = {
  name: 'Partita iva',
  component_id: 'field',
  preset: {
    id: 'vat',
    input: 'number',
    label: 'Partita iva',
    placeholder: 'XXXXXXXXX',
    condition:
      'tax_framework:freelance\ntax_framework:snc\ntax_framework:sas\ntax_framework:srl',
    required: true,
  },
}
const fieldSdi: StoryblokPreset = {
  name: 'Fatturazione elettronica',
  component_id: 'field',
  preset: {
    id: 'sdi',
    input: 'number',
    label: 'Codice fatturazione elettronica',
    placeholder: 'XXXXXXXXX',
    condition:
      'tax_framework:freelance\ntax_framework:snc\ntax_framework:sas\ntax_framework:srl',
    required: true,
  },
}
const fieldTax: StoryblokPreset = {
  name: 'Inquadramento fiscale',
  component_id: 'field',
  preset: {
    id: 'tax_framework',
    input: 'select',
    label: 'Inquadramento fiscale',
    options:
      'private:Privato\nfreelance:Libera professione\nsnc:Società in nome collettivo - SNC\nsas:Società in accomandita semplice - SAS\nsrl:Società a responsabilita limitata - SRL',
    required: true,
  },
}
const fieldPayment: StoryblokPreset = {
  name: 'Rateazione',
  component_id: 'field',
  preset: {
    id: 'payment',
    input: 'select',
    label: 'Rateazione',
    options:
      '1:Soluzione unica inizio corso\n2:Rateizzato 2 rate\n4:Rateizzato 4 rate\n8:Rateizzato 8 rate',
    required: true,
  },
}
const fieldAddress: StoryblokPreset = {
  name: 'Indirizzo',
  component_id: 'field',
  preset: {
    id: 'street',
    input: 'text',
    label: 'Indirizzo',
    placeholder: 'via dei tigli, 185/C',
    required: true,
  },
}
const fieldPostal: StoryblokPreset = {
  name: 'Codice postale',
  component_id: 'field',
  preset: {
    id: 'postal',
    input: 'number',
    label: 'Codice postale',
    placeholder: '35129',
    required: true,
  },
}
const fieldCity: StoryblokPreset = {
  name: 'Città',
  component_id: 'field',
  preset: {
    id: 'city',
    input: 'text',
    label: 'Città',
    placeholder: 'Ponte di Brenta',
    required: true,
  },
}
const fieldDistrict: StoryblokPreset = {
  name: 'Provincia',
  component_id: 'field',
  preset: {
    id: 'discrict',
    input: 'text',
    label: 'Provincia',
    placeholder: 'Padova',
    required: true,
  },
}
const fieldNationality: StoryblokPreset = {
  name: 'Nazionalità',
  component_id: 'field',
  preset: {
    id: 'nationality',
    input: 'text',
    label: 'Nazionalità',
    placeholder: 'Italiana',
  },
}
const fieldIdentityCard: StoryblokPreset = {
  name: "Carta d'identità",
  component_id: 'field',
  preset: {
    id: 'identity_card',
    input: 'text',
    label: "Numero cartà d'identità",
    required: true,
  },
}
const fieldFiscalCode: StoryblokPreset = {
  name: 'Numero codice fiscale',
  component_id: 'field',
  preset: {
    id: 'fiscal_code',
    input: 'text',
    label: 'Codice fiscale',
    required: true,
  },
}

export const presets = {
  fieldName,
  fieldSurname,
  fieldFullname,
  fieldBirthday,
  fieldGender,
  fieldBornIn,
  fieldEmail,
  fieldPhone,
  fieldPec,
  fieldCompany,
  fieldVat,
  fieldSdi,
  fieldTax,
  fieldPayment,
  fieldAddress,
  fieldPostal,
  fieldCity,
  fieldDistrict,
  fieldNationality,
  fieldIdentityCard,
  fieldFiscalCode,
}
