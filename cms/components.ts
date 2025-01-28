import type { ComponentSchema } from '../props/schema'
import type { StoryProps, BlokProps } from '../props/types'

export type ActionProps = BlokProps & {
  id: string
  label: string
  link: {
    cached_url: string
    linktype: 'story' | 'url'
    url: string
    target?: '_blank'
  }
  button: boolean
}

const action: ComponentSchema = {
  name: 'action',
  display_name: 'Collegamento',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.label}}`,
  schema: {
    label: {
      type: 'markdown',
      display_name: 'Etichetta',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: ['inlinecode'],
      default_value: 'Collegamento',
      required: true,
    },
    link: {
      type: 'multilink',
      display_name: 'Destinazione',
      restrict_content_types: true,
      component_whitelist: ['page', 'article', 'enroll'],
      show_anchor: true,
      asset_link_type: true,
    },
    button: {
      type: 'boolean',
      display_name: 'Mostra come bottone',
      inline_label: true,
    },
    id: {
      type: 'text',
      display_name: 'Tracciamento',
    },
  },
}

export type TextProps = BlokProps & {
  title: string
  description: string
  justify: 'right' | 'center' | 'left'
  hide: 'title' | 'description' | 'all'
}

const text: ComponentSchema = {
  name: 'text',
  display_name: 'Testo',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.title}}`,
  schema: {
    title: {
      type: 'markdown',
      display_name: 'Titolo',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'link',
        'inlinecode',
        'italic',
        'bold',
        'hrule',
      ],
      default_value: '### Titolo',
    },
    description: {
      type: 'markdown',
      display_name: 'Descrizione',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: [
        'bold',
        'paragraph',
        'list',
        'olist',
        'hrule',
        'link',
        'inlinecode',
      ],
      default_value: 'Descrizione...',
    },
    justify: {
      type: 'option',
      display_name: 'Giustifica',
      options: [
        { value: 'right', name: 'Destra' },
        { value: 'center', name: 'Centro' },
        { value: 'left', name: 'Sinistra' },
      ],
    },
    hide: {
      type: 'option',
      display_name: 'Nascondi mobile',
      options: [
        { value: 'title', name: 'Titolo' },
        { value: 'description', name: 'Descrizione' },
        { value: 'all', name: 'Tutto' },
      ],
    },
  },
}

export type PictureProps = BlokProps & {
  asset: {
    filename: string
    alt: string
    title: string
    source: string
    copyright: string
    focus: string
  }
  size: 'sm' | 'md' | 'lg' | 'xl'
  ratio: 'square' | 'portrait' | 'landscape' | 'circle'
  effect: 'blurred' | 'zoomed'
  background: boolean
  preview: boolean
}

const picture: ComponentSchema = {
  name: 'picture',
  display_name: 'Immagine',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.asset}}`,
  schema: {
    asset: {
      type: 'asset',
      display_name: 'Risorsa',
      filetypes: ['images'],
      required: true,
    },
    size: {
      type: 'option',
      display_name: 'Dimensione',
      options: [
        { value: 'sm', name: 'Piccola' },
        { value: 'md', name: 'Media' },
        { value: 'lg', name: 'Grande' },
        { value: 'xl', name: 'Enorme' },
      ],
    },
    ratio: {
      type: 'option',
      display_name: 'Forma',
      options: [
        { value: 'square', name: 'Quadrata' },
        { value: 'portrait', name: 'Verticale' },
        { value: 'landscape', name: 'Orizzontale' },
        { value: 'circle', name: 'Tonda' },
      ],
    },
    effect: {
      type: 'option',
      display_name: 'Effetto',
      options: [
        { value: 'blurred', name: 'Sfocato' },
        { value: 'zoomed', name: 'Zoom' },
      ],
    },
    preview: {
      type: 'boolean',
      display_name: 'Mostra in galleria',
      inline_label: true,
      default_value: false,
    },
    background: {
      type: 'boolean',
      display_name: 'Applica come sfondo',
      inline_label: true,
      default_value: false,
    },
  },
}

export type GalleryProps = BlokProps & {
  assets: Array<{
    filename: string
    alt: string
    title: string
    source: string
    copyright: string
    focus: string
  }>
}

const gallery: ComponentSchema = {
  name: 'gallery',
  display_name: 'Galleria',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: ``,
  schema: {
    assets: {
      type: 'multiasset',
      display_name: 'Immagini',
      filetypes: ['images'],
      required: true,
    },
  },
}
export type OptionProps = { name: string; value: string }

export type FieldProps = BlokProps & {
  id: string
  input:
    | 'text'
    | 'number'
    | 'email'
    | 'tel'
    | 'date'
    | 'checkbox'
    | 'area'
    | 'select'
    // | 'file' //TODO: find a file module
    | 'enroll'
    | 'hidden'
  label: string
  placeholder: string
  required: boolean
  options: string | Array<OptionProps>
}

const field: ComponentSchema = {
  name: 'field',
  display_name: 'Campo',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: ``,
  schema: {
    id: {
      type: 'text',
      display_name: 'Id',
      required: true,
    },
    input: {
      type: 'option',
      display_name: 'Tipo',
      options: [
        { value: 'text', name: 'Testo' },
        { value: 'number', name: 'Numero' },
        { value: 'email', name: 'Email' },
        { value: 'tel', name: 'Telefono' },
        { value: 'date', name: 'Data' },
        { value: 'checkbox', name: 'Casella' },
        { value: 'area', name: 'Messaggio' },
        { value: 'select', name: 'Selezione' },
        // { value: 'file', name: 'File' }, //TODO :find a module for file input
        { value: 'enroll', name: 'Iscrizione' },
        { value: 'hidden', name: 'Nascosto' },
      ],
      description:
        'Il campo tipo: "Iscrizione" può essere usato solo nelle pagine corso',
      default_value: 'text',
      required: true,
    },
    label: {
      type: 'text',
      display_name: 'Etichetta',
      required: true,
      max_length: 60,
    },
    placeholder: {
      type: 'text',
      display_name: 'Segnaposto',
      description: 'Indicare il valore per il tipo "Nascosto"',
      max_length: 140,
    },
    required: {
      type: 'boolean',
      display_name: 'Obbligatorio',
      default_value: false,
      inline_label: true,
    },
    options: {
      type: 'textarea',
      display_name: 'Opzioni',
      description: `Solo per il tipo "Selezione".
\nUsare la sintassi chiave:valore e andare a capo per ogni opzione.`,
    },
  },
}

export type ListProps = BlokProps & {
  label: string
  items: Array<TextProps & ActionProps>
  display: 'dropdown' | 'tab' | 'accordion'
}

const list: ComponentSchema = {
  name: 'list',
  display_name: 'Lista',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.display}}`,
  schema: {
    label: {
      type: 'text',
      display_name: 'Etichetta',
      required: true,
    },
    items: {
      type: 'bloks',
      display_name: 'Testi',
      restrict_components: true,
      component_whitelist: ['text', 'action'],
      required: true,
    },
    display: {
      type: 'option',
      display_name: 'Mostra come',
      options: [
        { value: 'dropdown', name: 'Menu' },
        { value: 'tab', name: 'Scheda' },
        { value: 'accordion', name: 'Fisarmonica' },
      ],
    },
  },
}

export type WrapperProps = BlokProps & {
  contents: Array<PictureProps & TextProps & ActionProps>
  row: boolean
  boxed: boolean
  size: 'small' | 'medium' | 'large' | 'extra'
  justify: 'right' | 'center' | 'left'
}

const wrapper: ComponentSchema = {
  name: 'wrapper',
  display_name: 'Contenitore',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.display}}`,
  schema: {
    contents: {
      type: 'bloks',
      display_name: 'Contenuti',
      restrict_components: true,
      component_whitelist: ['picture', 'gallery', 'text', 'action', 'list'],
      required: true,
    },
    row: {
      type: 'boolean',
      display_name: 'Orizontale',
      inline_label: true,
    },
    boxed: {
      type: 'boolean',
      display_name: 'Incorniciato',
      inline_label: true,
    },
    size: {
      type: 'option',
      display_name: 'Dimensione',
      options: [
        { value: 'small', name: 'Piccola' },
        { value: 'medium', name: 'Media' },
        { value: 'large', name: 'Grande' },
        { value: 'extra', name: 'Enorme' },
      ],
    },
    justify: {
      type: 'option',
      display_name: 'Giustifica',
      options: [
        { value: 'right', name: 'Destra' },
        { value: 'center', name: 'Centro' },
        { value: 'left', name: 'Sinistra' },
      ],
    },
  },
}

export type CarouselProps = BlokProps & {
  slides: Array<SectionProps | WrapperProps>
  weight: 'low' | 'high'
}

const carousel: ComponentSchema = {
  name: 'carousel',
  display_name: 'Carosello',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'containers',
  preview_tmpl: ``,
  schema: {
    slides: {
      type: 'bloks',
      display_name: 'Elementi',
      restrict_components: true,
      component_whitelist: ['section', 'wrapper'],
      required: true,
    },
    weight: {
      type: 'option',
      display_name: 'Densità',
      options: [
        { value: 'low', name: 'Bassa' },
        { value: 'high', name: 'Alta' },
      ],
    },
  },
}

export type MapProps = BlokProps & {
  locations: Array<LocationProps>
}

const map: ComponentSchema = {
  name: 'map',
  display_name: 'Mappa',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'containers',
  preview_tmpl: ``,
  schema: {
    locations: {
      type: 'options',
      display_name: 'Località',
      source: 'internal_stories',
      filter_content_type: ['location'],
      required: true,
    },
  },
}

export type FormProps = BlokProps & {
  scope: 'contact' | 'openday' | 'enroll'
  body: Array<FieldProps>
  message: string
}

const form: ComponentSchema = {
  name: 'form',
  display_name: 'Modulo',
  is_root: true,
  is_nestable: true,
  component_group_uuid: 'containers',
  preview_tmpl: ``,
  schema: {
    scope: {
      type: 'option',
      display_name: 'Scopo',
      options: [
        { value: 'contact', name: 'Richiesta informazioni' },
        { value: 'openday', name: 'Partecipazione openday' },
        { value: 'enroll', name: 'Iscrizione corso' },
      ],
      required: true,
    },
    fields: {
      type: 'bloks',
      display_name: 'Passaggi',
      restrict_components: true,
      component_whitelist: ['field'],
      required: true,
    },
    message: {
      type: 'markdown',
      display_name: 'Messaggio di successo',
      description: `Il messaggio di successo viene mostrato al termine del modulo.
\nNel testo potrai inserire {{nome del campo}} tra quelli inseriti.
\nElenco dei campi: 
name, surname,fullname, birthday, gender, email, phone, country, 
region, district, city, address, message, policy.`,
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: [
        'h3',
        'h4',
        'h5',
        'h6',
        'bold',
        'italic',
        'paragraph',
        'list',
        'hrule',
        'link',
        'image',
        'inlinecode',
      ],
      required: true,
    },
  },
}

export type SectionProps = BlokProps & {
  contents: Array<
    PictureProps &
      ListProps &
      TextProps &
      ActionProps &
      WrapperProps &
      CarouselProps &
      MapProps
  >
  theme: 'dark'
  contain: boolean
  id: string
}

const section: ComponentSchema = {
  name: 'section',
  display_name: 'Sezione',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'containers',
  preview_tmpl: `{{it.id}}`,
  schema: {
    id: {
      type: 'text',
      display_name: 'Ancora',
    },
    contents: {
      type: 'bloks',
      display_name: 'Contenuti',
      restrict_components: true,
      component_whitelist: ['picture', 'list', 'text', 'action', 'wrapper'],
      required: true,
    },
    theme: {
      type: 'option',
      display_name: 'Tema',
      options: [{ value: 'dark', name: 'Scuro' }],
    },
    contain: {
      type: 'boolean',
      display_name: 'Applica margini',
      default_value: true,
      inline_label: true,
    },
  },
}

export type NavProps = BlokProps & {
  contents: Array<ActionProps | ListProps>
  message: string
}

const nav: ComponentSchema = {
  name: 'nav',
  display_name: 'Navigatore',
  is_root: true,
  is_nestable: true,
  component_group_uuid: 'containers',
  preview_tmpl: ``,
  schema: {
    contents: {
      type: 'bloks',
      display_name: 'Collegamenti',
      restrict_components: true,
      component_whitelist: ['action', 'list'],
      required: true,
    },
    message: {
      type: 'markdown',
      display_name: 'Messaggio',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: ['bold', 'paragraph', 'link', 'inlinecode', 'italic'],
    },
  },
}

export type MetaProps = {
  title?: string
  description?: string
  image?: {
    filename: string
    alt: string
    title: string
    source: string
    copyright: string
    focus: string
  }
}

export type PageProps = BlokProps &
  MetaProps & {
    header: StoryProps & {
      content: NavProps
    }
    footer: StoryProps & {
      content: NavProps
    }
    body: Array<SectionProps & CarouselProps>
  }

const page: ComponentSchema = {
  name: 'page',
  display_name: 'Pagina',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'layouts',
  preview_tmpl: ``,
  schema: {
    preview: {
      type: 'section',
      display_name: 'Anteprima metadati',
      keys: ['title', 'description', 'image'],
    },
    title: {
      type: 'textarea',
      display_name: 'Titolo',
      max_length: 80,
    },
    description: {
      type: 'textarea',
      display_name: 'Riassunto',
      max_length: 300,
    },
    image: {
      type: 'asset',
      display_name: 'Immagine',
      description: 'Dimensione consigliata 1200x627px',
      filetypes: ['images'],
    },
    menu: {
      type: 'section',
      display_name: 'Menu pagina',
      keys: ['header', 'footer'],
    },
    header: {
      type: 'option',
      display_name: 'Menu superiore',
      description: 'Seleziona uno delle intestazioni o creane una nuova',
      source: 'internal_stories',
      filter_content_type: ['nav'],
    },
    footer: {
      type: 'option',
      display_name: 'Menu inferiore',
      description: 'Seleziona uno dei pie di pagina o creane uno nuovo',
      source: 'internal_stories',
      filter_content_type: ['nav'],
    },
    body: {
      type: 'bloks',
      display_name: 'Contenuti pagina',
      restrict_components: true,
      component_whitelist: ['section', 'carousel'],
    },
  },
}

export type EnrollProps = BlokProps &
  MetaProps & {
    header: StoryProps & {
      content: NavProps
    }
    footer: StoryProps & {
      content: NavProps
    }
    courses: Array<CourseProps>
    form: FormProps
    body: Array<SectionProps & CarouselProps>
  }

const enroll: ComponentSchema = {
  name: 'enroll',
  display_name: 'Iscrizione',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'layouts',
  preview_tmpl: `{{it.courses}}`,
  schema: {
    preview: {
      type: 'section',
      display_name: 'Anteprima metadati',
      keys: ['title', 'description', 'image'],
    },
    title: {
      type: 'textarea',
      display_name: 'Titolo',
      max_length: 80,
    },
    description: {
      type: 'textarea',
      display_name: 'Riassunto',
      max_length: 300,
    },
    image: {
      type: 'asset',
      display_name: 'Immagine',
      description: 'Dimensione consigliata 1200x627px',
      filetypes: ['images'],
    },
    menu: {
      type: 'section',
      display_name: 'Menu pagina',
      keys: ['header', 'footer'],
    },
    header: {
      type: 'option',
      display_name: 'Menu superiore',
      description: 'Seleziona uno delle intestazioni o creane una nuova',
      source: 'internal_stories',
      filter_content_type: ['nav'],
    },
    footer: {
      type: 'option',
      display_name: 'Menu inferiore',
      description: 'Seleziona uno dei pie di pagina o creane uno nuovo',
      source: 'internal_stories',
      filter_content_type: ['nav'],
    },
    enrollment: {
      type: 'section',
      display_name: 'Iscrizione',
      keys: ['courses', 'form'],
    },
    courses: {
      type: 'options',
      display_name: 'Corsi',
      source: 'internal_stories',
      restrict_content_types: true,
      filter_content_type: ['course'],
      required: true,
    },
    form: {
      type: 'option',
      display_name: 'Modulo',
      source: 'internal_stories',
      restrict_content_types: true,
      filter_content_type: ['form'],
      required: true,
    },
    body: {
      type: 'bloks',
      display_name: 'Contenuti',
      restrict_components: true,
      component_whitelist: ['section', 'carousel'],
    },
  },
}

export type ArticleProps = BlokProps &
  MetaProps & {
    author: StoryProps & {
      content: PersonProps
    }
    body: Array<SectionProps>
  }

const article: ComponentSchema = {
  name: 'article',
  display_name: 'Articolo',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'layouts',
  preview_tmpl: ``,
  schema: {
    preview: {
      type: 'section',
      display_name: 'Anteprima metadati',
      keys: ['title', 'description', 'image', 'author'],
    },
    title: {
      type: 'textarea',
      display_name: 'Titolo',
      max_length: 80,
      required: true,
    },
    description: {
      type: 'textarea',
      display_name: 'Riassunto',
      max_length: 300,
      required: true,
    },
    image: {
      type: 'asset',
      display_name: 'Immagine',
      description: 'Dimensione consigliata 1200x627px',
      filetypes: ['images'],
      required: true,
    },
    author: {
      type: 'option',
      display_name: 'Autore',
      source: 'internal_stories',
      filter_content_type: ['person'],
    },
    body: {
      type: 'bloks',
      display_name: 'Contenuti articolo',
      restrict_components: true,
      component_whitelist: ['section', 'carousel'],
    },
  },
}

export type LocationProps = {
  title: string
  address: string
  gps: string
  direction: string
}

const location: ComponentSchema = {
  name: 'location',
  display_name: 'Località',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'resources',
  preview_tmpl: ``,
  schema: {
    title: {
      type: 'text',
      display_name: 'Nome',
      required: true,
    },
    address: {
      type: 'textarea',
      display_name: 'Indirizzo',
      description: `Via, Civico - cap\nCittà Provincia`,
      required: true,
    },
    gps: {
      type: 'text',
      display_name: 'Coordinate',
      description: 'Latitudine/Longitudine',
      required: true,
    },
    direction: {
      type: 'text',
      display_name: 'Indicazioni',
    },
  },
}

export type CourseProps = {
  title: string
  location: LocationProps
  days: Array<
    'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì' | 'Sabato'
  >
  hours: Array<'9:00/12:00' | '13:00/16:00' | '20:00/23:00'>
  starts: string
  ends: string
  seats: number
  page: {
    cached_url: string
    linktype: 'story' | 'url'
    url: string
    target?: '_blank'
  }
}

const course: ComponentSchema = {
  name: 'course',
  display_name: 'Corso',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'resources',
  preview_tmpl: ``,
  schema: {
    title: {
      type: 'text',
      display_name: 'Titolo',
      required: true,
    },
    location: {
      type: 'option',
      display_name: 'Sede',
      source: 'internal_stories',
      filter_content_type: ['location'],
      required: true,
    },
    days: {
      type: 'options',
      display_name: 'Giorni di lezione',
      options: [
        { value: 'Lunedì', name: 'Lunedì' },
        { value: 'Martedi', name: 'Martedi' },
        { value: 'Mercoledì', name: 'Mercoledì' },
        { value: 'Giovedì', name: 'Giovedì' },
        { value: 'Venerdì', name: 'Venerdì' },
        { value: 'Sabato', name: 'Sabato' },
      ],
      required: true,
    },
    hours: {
      type: 'options',
      display_name: 'Orario delle lezioni',
      options: [
        { value: '9:00/12:00', name: '9:00/12:00' },
        { value: '13:00/16:00', name: '13:00/16:00' },
        { value: '20:00/23:00', name: '20:00/23:00' },
      ],
      required: true,
    },
    starts: {
      type: 'datetime',
      display_name: 'Data inizio',
      disable_time: true,
    },
    ends: {
      type: 'datetime',
      display_name: 'Data fine',
      disable_time: true,
    },
    seats: {
      type: 'number',
      display_name: 'Posti',
      description: 'Numero massimo di posti',
      default_value: '12',
    },
    page: {
      type: 'multilink',
      display_name: 'Pagina',
      restrict_content_types: true,
      component_whitelist: ['enroll'],
    },
  },
}

export type PersonProps = {
  image: Array<{
    filename: string
    alt: string
    title: string
    source: string
    copyright: string
    focus: string
  }>
  title: string
  description: string
  message: string
  links: Array<ActionProps>
}

const person: ComponentSchema = {
  name: 'person',
  display_name: 'Perona',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'resources',
  preview_tmpl: ``,
  schema: {
    image: {
      type: 'multiasset',
      display_name: 'Immagini',
      description: 'Dimensione consigliata 500x500',
      filetypes: ['images'],

      required: true,
    },
    title: {
      type: 'text',
      display_name: 'Nome Cognome',
      required: true,
    },
    description: {
      type: 'markdown',
      display_name: 'Descrizione',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: ['bold', 'italic', 'paragraph', 'quote'],
      max_length: 240,
      required: true,
    },
    message: {
      type: 'markdown',
      display_name: 'Messaggio',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: ['bold', 'italic', 'paragraph', 'quote'],
      max_length: 240,
      required: true,
    },
    links: {
      type: 'bloks',
      display_name: 'Collegamenti',
      restrict_components: true,
      component_whitelist: ['action'],
      maximum: 3,
    },
  },
}

const event: ComponentSchema = {
  name: 'event',
  display_name: 'Evento',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'resources',
  preview_tmpl: ``,
  schema: {
    title: {
      type: 'text',
      display_name: 'Titolo',
      required: true,
    },
    description: {
      type: 'markdown',
      display_name: 'Descrizione',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: [
        'bold',
        'paragraph',
        'list',
        'olist',
        'hrule',
        'link',
        'inlinecode',
      ],
      default_value: '',
    },
    location: {
      type: 'option',
      display_name: 'Sede',
      source: 'internal_stories',
      filter_content_type: ['location'],
    },
    date: {
      type: 'datetime',
      display_name: 'Data',
      required: true,
    },
    page: {
      type: 'multilink',
      display_name: 'Pagina',
      restrict_content_types: true,
      component_whitelist: ['page'],
    },
  },
}

export type Components =
  | 'action'
  | 'text'
  | 'picture'
  | 'gallery'
  | 'field'
  | 'list'
  | 'form'
  | 'wrapper'
  | 'carousel'
  | 'map'
  | 'section'
  | 'nav'
  | 'location'
  | 'course'
  | 'person'
  | 'event'
  | 'page'
  | 'article'
  | 'enroll'

export const components = {
  action,
  text,
  picture,
  gallery,
  field,
  list,
  wrapper,
  carousel,
  map,
  form,
  section,
  nav,
  page,
  enroll,
  article,
  location,
  course,
  person,
  event,
}
