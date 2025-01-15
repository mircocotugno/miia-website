import type { ComponentSchema } from '@props/schema'

const coach: ComponentSchema = {
  name: 'coach',
  display_name: 'Docente',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'resources',
  color: '#1e88e5',
  icon: 'block-locked',
  preview_tmpl: ``,
  schema: {
    image: {
      type: 'asset',
      display_name: 'Immagine',
      description: 'Dimensione consigliata 500x500',
      filetypes: ['images'],
      required: true,
    },
    name: {
      type: 'text',
      display_name: 'Nome Cognome',
      required: true,
    },
    role: {
      type: 'options',
      display_name: 'Ruolo',
      options: [
        { value: 'progettazione', name: 'Progettazione' },
        { value: 'stile e disegno', name: 'Stile e disegno' },
        { value: 'software CAD', name: 'Software CAD' },
      ],
      required: true,
    },
    about: {
      type: 'markdown',
      display_name: 'Descrizione',
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

const student: ComponentSchema = {
  name: 'student',
  display_name: 'Studente',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'resources',
  color: '#1e88e5',
  icon: 'block-locked',
  preview_tmpl: ``,
  schema: {
    image: {
      type: 'asset',
      display_name: 'Immagine',
      description: 'Dimensione consigliata 500x500',
      filetypes: ['images'],
      required: true,
    },
    name: {
      type: 'text',
      display_name: 'Nome Cognome',
      required: true,
    },
    quote: {
      type: 'markdown',
      display_name: 'Recensione',
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

const course: ComponentSchema = {
  name: 'course',
  display_name: 'Corso',
  is_root: true,
  is_nestable: true,
  component_group_uuid: 'resources',
  color: '#ffd600',
  icon: 'block-shield-2',
  preview_tmpl: ``,
  schema: {
    program: {
      type: 'option',
      display_name: 'Tipo',
      options: [
        { value: 'interior base', name: 'Interni - base' },
        { value: 'fashion base', name: 'Moda - base' },
        { value: 'interior avanzato', name: 'Interni - avanzato' },
        { value: 'fashion avanzato', name: 'Moda - avanzato' },
      ],
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
    location: {
      type: 'option',
      display_name: 'Sede',
      source: 'internal',
      datasource_slug: 'locations',
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
    link: {
      type: 'multilink',
      display_name: 'Collegamento',
      restrict_content_types: true,
      component_whitelist: ['enroll'],
      link_scope: '{0}/{1}/',
      force_link_scope: true,
      required: true,
    },
  },
}

const page: ComponentSchema = {
  name: 'page',
  display_name: 'Pagina',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'layouts',
  color: '#00b8d4',
  icon: 'block-doc',
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
      component_whitelist: ['section', 'cover'],
    },
  },
}

const article: ComponentSchema = {
  name: 'article',
  display_name: 'Articolo',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'layouts',
  color: '#43a047',
  icon: 'block-comment',
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
      filter_content_type: ['coach'],
    },
    body: {
      type: 'bloks',
      display_name: 'Contenuti articolo',
      restrict_components: true,
      component_whitelist: ['section'],
    },
  },
}

const enroll: ComponentSchema = {
  name: 'enroll',
  display_name: 'Iscrizione',
  is_root: true,
  is_nestable: false,
  component_group_uuid: 'layouts',
  color: '#ff3d00',
  icon: 'block-cart',
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
      component_whitelist: ['section', 'cover'],
    },
  },
}

const nav: ComponentSchema = {
  name: 'nav',
  display_name: 'Navigatore',
  is_root: true,
  is_nestable: true,
  component_group_uuid: 'containers',
  color: '#8e24aa',
  icon: 'block-buildin',
  preview_tmpl: ``,
  schema: {
    links: {
      type: 'bloks',
      display_name: 'Collegamenti',
      restrict_components: true,
      component_whitelist: ['action', 'menu'],
      required: true,
    },
    actions: {
      type: 'bloks',
      display_name: 'Azioni',
      restrict_components: true,
      component_whitelist: ['action'],
    },
    message: {
      type: 'markdown',
      display_name: 'Messaggio',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: ['bold', 'link', 'inlinecode', 'italic'],
    },
  },
}

const menu: ComponentSchema = {
  name: 'menu',
  display_name: 'Menu',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  color: '#8e24aa',
  icon: 'block-buildin',
  preview_tmpl: ``,
  schema: {
    label: {
      type: 'text',
      display_name: 'Etichetta',
      required: true,
    },
    links: {
      type: 'bloks',
      display_name: 'Collegamenti',
      restrict_components: true,
      component_whitelist: ['action'],
      required: true,
    },
  },
}

const cover: ComponentSchema = {
  name: 'cover',
  display_name: 'Copertina',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'containers',
  color: '#ff7043',
  icon: 'block-center-m',
  preview_tmpl: ``,
  schema: {
    body: {
      type: 'bloks',
      display_name: 'Contenuti',
      restrict_components: true,
      component_whitelist: ['heading', 'action'],
    },
    background: {
      type: 'asset',
      display_name: 'Sfondo',
      description: 'Dimensione consigliata 1920x1280px',
      filetypes: ['images'],
    },
    styles: {
      type: 'options',
      display_name: 'Stili',
      options: [
        { value: 'themeDark', name: 'Tema scuro' },
        { value: 'justifyRight', name: 'Giusifica a destra' },
        { value: 'minHeight', name: 'Altezza minima' },
      ],
    },
  },
}

const section: ComponentSchema = {
  name: 'section',
  display_name: 'Sezione',
  is_root: false,
  is_nestable: true,
  color: '#9c24d8',
  icon: 'block-block',
  component_group_uuid: 'containers',
  preview_tmpl: ``,
  schema: {
    headline: {
      type: 'markdown',
      display_name: 'Intestazione',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: [
        'h1',
        'h2',
        'h3',
        'h4',
        'link',
        'inlinecode',
        'italic',
        'bold',
        'hrule',
      ],
      default_value: '### Titolo...',
    },
    body: {
      type: 'bloks',
      display_name: 'Contenuti',
      restrict_components: true,
      component_whitelist: [
        'content',
        'grid',
        'map',
        'gallery',
        'picture',
        'accordion',
        'carousel',
        'alias',
      ],
      required: true,
    },
    footer: {
      type: 'bloks',
      display_name: 'Chiusura',
      restrict_components: true,
      component_whitelist: ['action', 'alias'],
    },
    styles: {
      type: 'options',
      display_name: 'Stili',
      options: [
        { value: 'themeDark', name: 'Tema scuro' },
        { value: 'smallSpaces', name: 'Spaziatura ridotta' },
        { value: 'justifyCenter', name: 'Giusifica al centro' },
      ],
    },
  },
}

const grid: ComponentSchema = {
  name: 'grid',
  display_name: 'Griglia',
  is_root: true,
  is_nestable: true,
  component_group_uuid: 'containers',
  color: '#ffd600',
  icon: 'block-shield-2',
  preview_tmpl: ``,
  schema: {
    items: {
      type: 'options',
      display_name: 'Elementi',
      source: 'internal_stories',
      filter_content_type: ['coach', 'article'],
      required: true,
    },
    styles: {
      type: 'options',
      display_name: 'Stili',
      options: [{ value: 'doubleWidth', name: 'Larghezza doppia' }],
    },
  },
}

const map: ComponentSchema = {
  name: 'map',
  display_name: 'Mappa',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'containers',
  color: '#195B4A',
  icon: 'block-map-pin',
  preview_tmpl: ``,
  schema: {
    locations: {
      type: 'options',
      display_name: 'Sedi',
      source: 'internal',
      datasource_slug: 'locations',
      required: true,
    },
  },
}

const accordion: ComponentSchema = {
  name: 'accordion',
  display_name: 'Fisarmonica',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'containers',
  color: '#ff7043',
  icon: 'block-text-img-c',
  preview_tmpl: ``,
  schema: {
    contents: {
      type: 'bloks',
      display_name: 'Contenuti',
      restrict_components: true,
      component_whitelist: ['content'],
    },
  },
}

const form: ComponentSchema = {
  name: 'form',
  display_name: 'Modulo',
  is_root: true,
  is_nestable: true,
  color: '#1a3ada',
  icon: 'block-suitcase',
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
    body: {
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

const field: ComponentSchema = {
  name: 'field',
  display_name: 'Campo',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  color: '#455a64',
  icon: 'block-tag',
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
      default_value: 'false',
    },
    options: {
      type: 'textarea',
      display_name: 'Opzioni',
      description: `Solo per il tipo "Selezione".
\nUsare la sintassi chiave:valore e andare a capo per ogni opzione.`,
    },
  },
}

const heading: ComponentSchema = {
  name: 'heading',
  display_name: 'Intestazione',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  color: '#ff1744',
  icon: 'block-sticker',
  preview_tmpl: ``,
  schema: {
    body: {
      type: 'markdown',
      display_name: 'Testo intestazione',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: [
        'h1',
        'h2',
        'h3',
        'h4',
        'link',
        'inlinecode',
        'italic',
        'bold',
        'hrule',
      ],
      required: true,
      default_value: '### Titolo...',
    },
  },
}

const content: ComponentSchema = {
  name: 'content',
  display_name: 'Descrizione',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  color: '#8bc34a',
  icon: 'block-text-c',
  schema: {
    head: {
      type: 'markdown',
      display_name: 'Titolo',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: ['h3', 'h4', 'h5', 'h6'],
      default_value: '### Titolo...',
    },
    body: {
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
        'image',
      ],
      required: true,
      default_value: 'Descrizione...',
    },
  },
}

const gallery: ComponentSchema = {
  name: 'gallery',
  display_name: 'Galleria',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  color: '#d500f9',
  icon: 'block-image',
  preview_tmpl: ``,
  schema: {
    images: {
      type: 'multiasset',
      display_name: 'Immagini',
      filetypes: ['images'],
      required: true,
    },
  },
}

const carousel: ComponentSchema = {
  name: 'carousel',
  display_name: 'Carosello',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'containers',
  color: '#d500f9',
  icon: 'block-image',
  preview_tmpl: ``,
  schema: {
    items: {
      type: 'bloks',
      display_name: 'Elementi',
      restrict_components: true,
      component_whitelist: ['content', 'cover'],
      required: true,
    },
  },
}

const picture: ComponentSchema = {
  name: 'picture',
  display_name: 'Immagine',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  color: '#d500f9',
  icon: 'block-image',
  preview_tmpl: ``,
  schema: {
    image: {
      type: 'asset',
      display_name: 'Immagini',
      filetypes: ['images'],
      required: true,
    },
    style: {
      type: 'option',
      display_name: 'Stili',
      options: [
        { value: 'sm', name: 'piccola' },
        { value: 'md', name: 'media' },
        { value: 'lg', name: 'grande' },
        { value: 'xl', name: 'extra' },
      ],
    },
  },
}

const action: ComponentSchema = {
  name: 'action',
  display_name: 'Azione',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  color: '#ffa000',
  icon: 'block-arrow-pointer',
  preview_tmpl: ``,
  schema: {
    id: {
      type: 'text',
      display_name: 'Id',
    },
    label: {
      type: 'markdown',
      display_name: 'Etichetta',
      customize_toolbar: true,
      rich_markdown: true,
      required: true,
      toolbar: ['bold', 'inlinecode'],
    },
    link: {
      type: 'multilink',
      display_name: 'Collegamento',
      restrict_content_types: true,
      component_whitelist: ['page', 'article', 'enroll'],
      show_anchor: true,
      asset_link_type: true,
    },
  },
}

const alias: ComponentSchema = {
  name: 'alias',
  display_name: 'Risorsa',
  is_root: true,
  is_nestable: true,
  component_group_uuid: 'elements',
  color: '#ffd600',
  icon: 'block-shield-2',
  preview_tmpl: ``,
  schema: {
    item: {
      type: 'option',
      display_name: 'Elemento',
      source: 'internal_stories',
      filter_content_type: ['article', 'coach', 'form', 'student', 'course'],
      required: true,
    },
  },
}

// const group: ComponentSchema = {
//   name: 'group',
//   display_name: 'Gruppo',
//   is_root: false,
//   is_nestable: true,
//   color: '#4db6ac',
//   icon: 'block-wallet',
//   component_group_uuid: 'containers',
//   preview_tmpl: ``,
//   schema: {},
// }

// const row: ComponentSchema = {
//   name: 'row',
//   display_name: 'Riga',
//   is_root: false,
//   is_nestable: true,
//   color: '#9c24d8',
//   icon: 'block-block',
//   component_group_uuid: 'containers',
//   preview_tmpl: ``,
//   schema: {},
// }

// const slider: ComponentSchema = {
//   name: 'slider',
//   display_name: 'Carosello',
//   is_root: false,
//   is_nestable: true,
//   color: '#6525d3',
//   icon: 'block-text-img-r-l',
//   component_group_uuid: 'containers',
//   preview_tmpl: ``,
//   schema: {},
// }

export type Components =
  | 'coach'
  | 'student'
  | 'course'
  | 'page'
  | 'article'
  | 'enroll'
  | 'cover'
  | 'section'
  | 'action'
  | 'nav'
  | 'menu'
  | 'grid'
  | 'map'
  | 'accordion'
  | 'heading'
  | 'content'
  | 'form'
  | 'field'
  | 'gallery'
  | 'carousel'
  | 'picture'
  | 'alias'

export const components = {
  coach,
  student,
  course,
  page,
  article,
  enroll,
  cover,
  section,
  action,
  nav,
  menu,
  grid,
  map,
  accordion,
  heading,
  content,
  form,
  field,
  gallery,
  carousel,
  picture,
  alias,
}
