export type BaseAttribute = {
  type: 'text' | 'date' | 'float' | 'boolean' | 'id' | 'user'
}

export type CategoryAttribute = {
  type: 'category'
  enumeration: Array<{ value: number; label: string }>
}

export type MultipleChoiceAttribute = {
  type: 'multiple-choice'
  multiCategoryOptions: Array<string>
}

export type AttributesTypes =
  | BaseAttribute
  | CategoryAttribute
  | MultipleChoiceAttribute

type Attributes = {
  [key: string]: AttributesTypes
}

export const attributes: Attributes = {
  interesse_ambito: {
    type: 'category',
    enumeration: [
      { value: 1, label: 'interni' },
      { value: 2, label: 'moda' },
    ],
  },
  interesse_sede: {
    type: 'multiple-choice',
    multiCategoryOptions: ['treviso', 'padova', 'bassano'],
  },
  interesse_frequenza: {
    type: 'multiple-choice',
    multiCategoryOptions: ['serale', 'sabato'],
  },
  interesse_inizio: {
    type: 'multiple-choice',
    multiCategoryOptions: ['marzo', 'ottobre'],
  },
  interesse_scopo: {
    type: 'category',
    enumeration: [
      { value: 1, label: 'lavoro' },
      { value: 2, label: 'ruolo' },
      { value: 3, label: 'piacere' },
    ],
  },
  openday_data: {
    type: 'date',
  },
  openday_conferma: {
    type: 'boolean',
  },
  openday_partecipazione: {
    type: 'boolean',
  },
  profilo_formazione: {
    type: 'text',
  },
  profilo_lavoro: {
    type: 'text',
  },
  profilo_presentazione: {
    type: 'text',
  },
  pagamento_fattura: {
    type: 'category',
    enumeration: [
      { value: 1, label: 'privato' },
      { value: 2, label: 'azienda' },
    ],
  },
  pagamento_dilazione: {
    type: 'category',
    enumeration: [
      { value: 1, label: 'unica' },
      { value: 2, label: '5 rate' },
      { value: 3, label: '9 rate' },
    ],
  },
  iscrizione_corso: {
    type: 'text',
  },
  iscrizione_contratto: {
    type: 'boolean',
  },
  progetto_intervento: {
    type: 'category',
    enumeration: [
      { value: 1, label: 'arredare' },
      { value: 2, label: 'rinnovare' },
      { value: 3, label: 'ristrutturare' },
    ],
  },
  progetto_immobile: {
    type: 'text',
  },
  progetto_budget: {
    type: 'float',
  },
  progetto_dimensione: {
    type: 'float',
  },
  persona_codice: {
    type: 'text',
  },
  persona_nascita: {
    type: 'date',
  },
  persona_luogo: {
    type: 'text',
  },
  persona_sesso: {
    type: 'category',
    enumeration: [
      { value: 1, label: 'maschio' },
      { value: 2, label: 'femmina' },
      { value: 3, label: 'altro' },
    ],
  },
  residenza_indirizzo: {
    type: 'text',
  },
  residenza_citta: {
    type: 'text',
  },
  residenza_provincia: {
    type: 'text',
  },
  azienda_nome: {
    type: 'text',
  },
  azienda_partitaiva: {
    type: 'float',
  },
  azienda_indirizzo: {
    type: 'text',
  },
  azienda_citta: {
    type: 'text',
  },
  azienda_provincia: {
    type: 'text',
  },
  collaborazione_richiesta: {
    type: 'multiple-choice',
    multiCategoryOptions: ['studenti', 'commerciale', 'formazione'],
  },
}
