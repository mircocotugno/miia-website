import type { ComponentSchema } from '../props/schema'

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
      required: true,
    },
    link: {
      type: 'multilink',
      display_name: 'Destinazione',
      restrict_content_types: true,
      component_whitelist: ['page', 'article'],
      show_anchor: true,
      asset_link_type: true,
    },
    button: {
      type: 'boolean',
      display_name: 'Mostra come bottone',
      inline_label: true,
    },
    color: {
      type: 'option',
      display_name: 'Colore',
      options: [
        { value: 'primary', name: 'Primario' },
        { value: 'secondary', name: 'Secondario' },
      ],
    },
    id: {
      type: 'text',
      display_name: 'Tracciamento',
    },
  },
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
    width: {
      type: 'options',
      display_name: 'Larghezza',
      options: [
        { value: '1/4', name: 'Un quarto' },
        { value: '1/3', name: 'Un terzo' },
        { value: '1/2', name: 'Metà' },
        { value: '2/3', name: 'Due terzi' },
        { value: '3/4', name: 'Tre quarti' },
        { value: '1/1', name: 'Intera' },
      ],
      default_value: ['1/2'],
      description:
        'Larghezza rispetto alla sezione. Usare più opzioni per schermi sempre più grandi.',
      tooltip: true,
      max_options: 4,
    },
    theme: {
      type: 'option',
      display_name: 'Tema',
      options: [
        { value: 'primary', name: 'Primario' },
        { value: 'secondary', name: 'Secondario' },
      ],
    },
    order: {
      type: 'number',
      display_name: 'Riordino mobile',
      max_value: 6,
      min_value: 0,
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

const image: ComponentSchema = {
  name: 'image',
  display_name: 'Immagine',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.image.alt}}`,
  schema: {
    image: {
      type: 'asset',
      display_name: 'Immagine',
      filetypes: ['images'],
      required: true,
    },
    width: {
      type: 'options',
      display_name: 'Larghezza',
      options: [
        { value: '1/4', name: 'Un quarto' },
        { value: '1/3', name: 'Un terzo' },
        { value: '1/2', name: 'Metà' },
        { value: '2/3', name: 'Due terzi' },
        { value: '3/4', name: 'Tre quarti' },
        { value: '1/1', name: 'Intera' },
      ],
      default_value: ['1/2'],
      description:
        'Larghezza rispetto alla sezione. Usare più opzioni per schermi sempre più grandi.',
      tooltip: true,
      max_options: 4,
    },
    size: {
      type: 'option',
      display_name: 'Dimensione',
      options: [
        { value: 'sm', name: 'Piccola' },
        { value: 'md', name: 'Media' },
        { value: 'lg', name: 'Grande' },
      ],
      description: 'Dimensione fissa immagine',
      tooltip: true,
    },
    aspect: {
      type: 'option',
      display_name: 'Aspetto',
      options: [
        { value: '1/1', name: 'Quadrata' },
        { value: '3/4', name: 'Verticale' },
        { value: '4/9', name: 'Verticale stretta' },
        { value: '4/3', name: 'Orizzontale' },
        { value: '9/4', name: 'Orizzontale larga' },
      ],
      description: 'Proporzioni immagine',
      tooltip: true,
    },
    order: {
      type: 'number',
      display_name: 'Riordino mobile',
      max_value: 6,
      min_value: 0,
    },
    fullScreen: {
      type: 'boolean',
      display_name: 'Mostra tutto schemo',
      inline_label: true,
      default_value: false,
    },
    author: {
      type: 'option',
      display_name: 'Autore',
      source: 'internal_stories',
      filter_content_type: ['person'],
    },
  },
}

const gallery: ComponentSchema = {
  name: 'gallery',
  display_name: 'Galleria',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.images.alt}}`,
  schema: {
    images: {
      type: 'multiasset',
      display_name: 'Immagini',
      filetypes: ['images'],
      required: true,
    },
    aspect: {
      type: 'option',
      display_name: 'Aspetto',
      options: [
        { value: '1/1', name: 'Quadrata' },
        { value: '3/4', name: 'Verticale' },
        { value: '4/3', name: 'Orizzontale' },
      ],
    },
    fullScreen: {
      type: 'boolean',
      display_name: 'Mostra tutto schemo',
      inline_label: true,
      default_value: false,
    },
  },
}

const background: ComponentSchema = {
  name: 'background',
  display_name: 'Sfondo',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.image.alt}}`,
  schema: {
    image: {
      type: 'asset',
      display_name: 'Immagine',
      filetypes: ['images'],
    },
    video: {
      type: 'text',
      display_name: 'Video',
      description: 'Id del video su youtube',
      inline_label: true,
    },
    author: {
      type: 'option',
      display_name: 'Autore',
      source: 'internal_stories',
      filter_content_type: ['person'],
    },
  },
}

const video: ComponentSchema = {
  name: 'video',
  display_name: 'Video',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: '',
  schema: {
    source: {
      type: 'text',
      display_name: 'Collegamento',
      required: true,
    },
    size: {
      type: 'option',
      display_name: 'Grandezza',
      options: [
        { value: 'sm', name: 'Piccolo' },
        { value: 'md', name: 'Medio' },
        { value: 'lg', name: 'Grande' },
        { value: 'xl', name: 'Enorme' },
      ],
    },
  },
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
        { value: 'multiple', name: 'Selezione multipla' },
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

const menu: ComponentSchema = {
  name: 'menu',
  display_name: 'Menu',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.title}}`,
  schema: {
    title: {
      type: 'text',
      display_name: 'Titolo',
    },
    links: {
      type: 'bloks',
      display_name: 'Collegamenti',
      restrict_components: true,
      component_whitelist: ['action'],
      required: true,
    },
    inline: {
      type: 'boolean',
      display_name: 'Disponi in linea',
      default_value: false,
      inline_label: true,
    },
  },
}

const process: ComponentSchema = {
  name: 'process',
  display_name: 'Procedura',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.title}}`,
  schema: {
    links: {
      type: 'bloks',
      display_name: 'Passaggi',
      restrict_components: true,
      component_whitelist: ['wrapper'],
      required: true,
    },
  },
}

const list: ComponentSchema = {
  name: 'list',
  display_name: 'Fisarmonica',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{@each(it.title)}}`,
  schema: {
    items: {
      type: 'bloks',
      display_name: 'Testi',
      restrict_components: true,
      component_whitelist: ['text'],
      required: true,
    },
    size: {
      type: 'option',
      display_name: 'Largezza',
      options: [
        { value: '1/4', name: 'Un quarto' },
        { value: '1/3', name: 'Un terzo' },
        { value: '1/2', name: 'Metà' },
        { value: '2/3', name: 'Due terzi' },
        { value: '3/4', name: 'Tre quarti' },
      ],
      default_value: '1/2',
    },
  },
}

const alias: ComponentSchema = {
  name: 'alias',
  display_name: 'Risorsa',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: ``,
  schema: {
    resource: {
      type: 'option',
      display_name: 'Tipo',
      options: [
        { value: 'next-event', name: 'Prossimo evento' },
        { value: 'last-article', name: 'Ultimo articolo' },
      ],
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
  },
}

const aside: ComponentSchema = {
  name: 'aside',
  display_name: 'Fianco',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.display}}`,
  schema: {
    id: {
      type: 'text',
      display_name: 'Ancora',
    },
    enrollment: {
      type: 'section',
      display_name: 'Iscrizione',
      keys: ['headline', 'courses', 'form'],
    },
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
        'h5',
        'h6',
        'link',
        'inlinecode',
        'italic',
        'bold',
        'hrule',
      ],
      required: true,
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
    contents: {
      type: 'bloks',
      display_name: 'Contenuti',
      restrict_components: true,
      component_whitelist: ['process', 'text', 'action', 'wrapper', 'alias'],
      required: true,
    },
    theme: {
      type: 'option',
      display_name: 'Tema',
      options: [{ value: 'dark', name: 'Scuro' }],
    },
  },
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
      component_whitelist: [
        'alias',
        'background',
        'image',
        'list',
        'process',
        'text',
        'action',
        'wrapper',
        'carousel',
        'location',
        'person',
        'event',
        'course',
        'article',
        'form',
      ],
      required: true,
    },
    align: {
      type: 'option',
      display_name: 'Allinea',
      options: [
        { name: 'Sopra', value: 'start' },
        { name: 'Centro', value: 'center' },
        { name: 'Sotto', value: 'end' },
        { name: 'Riempi', value: 'stretch' },
      ],
    },
    dark: {
      type: 'boolean',
      display_name: 'Tema scuro',
      default_value: false,
      inline_label: true,
    },
    contain: {
      type: 'boolean',
      display_name: 'Applica margini',
      default_value: true,
      inline_label: true,
    },
  },
}

const wrapper: ComponentSchema = {
  name: 'wrapper',
  display_name: 'Contenitore',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'elements',
  preview_tmpl: `{{it.width}}`,
  schema: {
    contents: {
      type: 'bloks',
      display_name: 'Contenuti',
      restrict_components: true,
      component_whitelist: [
        'image',
        'video',
        'gallery',
        'text',
        'action',
        'list',
        'menu',
        'map',
        'course',
        'person',
        'event',
        'form',
      ],
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
    width: {
      type: 'options',
      display_name: 'New Larghezza',
      options: [
        { value: '1/4', name: 'Un quarto' },
        { value: '1/3', name: 'Un terzo' },
        { value: '1/2', name: 'Metà' },
        { value: '2/3', name: 'Due terzi' },
        { value: '3/4', name: 'Tre quarti' },
        { value: '1/1', name: 'Intera' },
      ],
      default_value: ['1/2'],
      description:
        'Larghezza rispetto alla sezione. Usare più opzioni per schermi sempre più grandi.',
      tooltip: true,
      max_options: 4,
    },
    size: {
      type: 'option',
      display_name: 'Largezza',
      options: [
        { value: '1/4', name: 'Un quarto' },
        { value: '1/3', name: 'Un terzo' },
        { value: '1/2', name: 'Metà' },
        { value: '2/3', name: 'Due terzi' },
        { value: '3/4', name: 'Tre quarti' },
      ],
      default_value: '1/2',
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
    order: {
      type: 'number',
      display_name: 'Riordino mobile',
      max_value: 6,
      min_value: 0,
    },
  },
}

const carousel: ComponentSchema = {
  name: 'carousel',
  display_name: 'Carosello',
  is_root: false,
  is_nestable: true,
  component_group_uuid: 'containers',
  preview_tmpl: ``,
  schema: {
    id: {
      type: 'text',
      display_name: 'Ancora',
    },
    slides: {
      type: 'bloks',
      display_name: 'Elementi',
      restrict_components: true,
      component_whitelist: ['section', 'wrapper', 'person', 'image'],
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
    order: {
      type: 'number',
      display_name: 'Riordino mobile',
      max_value: 6,
      min_value: 0,
    },
  },
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

const form: ComponentSchema = {
  name: 'form',
  display_name: 'Modulo',
  is_root: true,
  is_nestable: true,
  component_group_uuid: 'containers',
  preview_tmpl: ``,
  schema: {
    ref: {
      type: 'option',
      display_name: 'Collega',
      source: 'internal_stories',
      filter_content_type: ['form'],
    },
    new: {
      type: 'section',
      display_name: 'Nuovo',
      keys: ['scope', 'title', 'label', 'fields', 'message'],
    },
    scope: {
      type: 'option',
      display_name: 'Scopo',
      options: [
        { value: 'corsi', name: 'Corsi' },
        { value: 'progetti', name: 'Progetti' },
        { value: 'aziende', name: 'Aziende' },
        { value: 'docenza', name: 'Docenza' },
      ],
    },
    title: {
      type: 'text',
      display_name: 'Titolo',
    },
    label: {
      type: 'text',
      display_name: 'Azione',
    },
    fields: {
      type: 'bloks',
      display_name: 'Passaggi',
      restrict_components: true,
      component_whitelist: ['field'],
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
    },
  },
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
      component_whitelist: ['action', 'menu'],
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
      component_whitelist: ['section', 'carousel', 'map', 'aside'],
    },
  },
}

const article: ComponentSchema = {
  name: 'article',
  display_name: 'Articolo',
  is_root: true,
  is_nestable: true,
  component_group_uuid: 'layouts',
  preview_tmpl: ``,
  schema: {
    ref: {
      type: 'option',
      display_name: 'Collega',
      source: 'internal_stories',
      filter_content_type: ['article'],
    },
    new: {
      type: 'section',
      display_name: 'Nuovo',
      keys: ['title', 'description', 'image', 'author', 'body'],
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

const location: ComponentSchema = {
  name: 'location',
  display_name: 'Località',
  is_root: true,
  is_nestable: true,
  component_group_uuid: 'resources',
  preview_tmpl: ``,
  schema: {
    ref: {
      type: 'option',
      display_name: 'Collega',
      source: 'internal_stories',
      filter_content_type: ['location'],
    },
    new: {
      type: 'section',
      display_name: 'Nuovo',
      keys: ['title', 'address', 'gps', 'direction'],
    },
    title: {
      type: 'text',
      display_name: 'Nome',
    },
    address: {
      type: 'textarea',
      display_name: 'Indirizzo',
      description: `Via, Civico - cap\nCittà Provincia`,
    },
    gps: {
      type: 'text',
      display_name: 'Coordinate',
      description: 'Latitudine/Longitudine',
    },
    direction: {
      type: 'text',
      display_name: 'Indicazioni',
    },
  },
}

const course: ComponentSchema = {
  name: 'course',
  display_name: 'Corso',
  is_root: true,
  is_nestable: true,
  component_group_uuid: 'resources',
  preview_tmpl: ``,
  schema: {
    ref: {
      type: 'option',
      display_name: 'Collega',
      source: 'internal_stories',
      filter_content_type: ['course'],
    },
    new: {
      type: 'section',
      display_name: 'Nuovo',
      keys: [
        'id',
        'title',
        'location',
        'days',
        'hours',
        'starts',
        'ends',
        'seats',
        'page',
      ],
    },
    id: {
      type: 'text',
      display_name: 'Id del corso',
      required: true,
      description: `[numero]-[sede]-[area]-[frequenza]\nEsempio: 01-treviso-interni-serale`,
      inline_label: true,
    },
    title: {
      type: 'text',
      display_name: 'Titolo',
    },
    location: {
      type: 'option',
      display_name: 'Sede',
      source: 'internal_stories',
      filter_content_type: ['location'],
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
    },
    hours: {
      type: 'options',
      display_name: 'Orario delle lezioni',
      options: [
        { value: '9:00/12:00', name: '9:00/12:00' },
        { value: '13:00/16:00', name: '13:00/16:00' },
        { value: '20:00/23:00', name: '20:00/23:00' },
      ],
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
      component_whitelist: ['page'],
    },
  },
}

const person: ComponentSchema = {
  name: 'person',
  display_name: 'Persona',
  is_root: true,
  is_nestable: true,
  component_group_uuid: 'resources',
  preview_tmpl: ``,
  schema: {
    ref: {
      type: 'option',
      display_name: 'Collega',
      source: 'internal_stories',
      filter_content_type: ['person'],
    },
    new: {
      type: 'section',
      display_name: 'Nuovo',
      keys: ['image', 'title', 'role', 'description', 'message', 'links'],
    },
    image: {
      type: 'multiasset',
      display_name: 'Immagini',
      description: 'Dimensione consigliata 500x500',
      filetypes: ['images'],
    },
    title: {
      type: 'text',
      display_name: 'Nome Cognome',
    },
    role: {
      type: 'option',
      display_name: 'Ruolo',
      options: [
        { value: 'interior', name: 'Studente interni' },
        // { value: 'fashion', name: 'Studente moda' },
        { value: 'style', name: 'Docente stile' },
        { value: 'design', name: 'Docente progettazione' },
        { value: 'software', name: 'Docente software' },
      ],
    },
    description: {
      type: 'markdown',
      display_name: 'Descrizione',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: ['bold', 'italic', 'paragraph', 'quote', 'inlinecode'],
      max_length: 240,
    },
    message: {
      type: 'markdown',
      display_name: 'Messaggio',
      customize_toolbar: true,
      rich_markdown: true,
      toolbar: ['bold', 'italic', 'paragraph', 'quote', 'inlinecode'],
      max_length: 240,
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
  is_nestable: true,
  component_group_uuid: 'resources',
  preview_tmpl: ``,
  schema: {
    new: {
      type: 'section',
      display_name: 'Nuovo',
      keys: ['title', 'description', 'location', 'date', 'page'],
    },
    title: {
      type: 'text',
      display_name: 'Titolo',
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
    },
    page: {
      type: 'multilink',
      display_name: 'Pagina',
      restrict_content_types: true,
      component_whitelist: ['page'],
    },
    ref: {
      type: 'option',
      display_name: 'Collega',
      source: 'internal_stories',
      filter_content_type: ['event'],
    },
    form: {
      type: 'option',
      display_name: 'Modulo',
      source: 'internal_stories',
      restrict_content_types: true,
      filter_content_type: ['form'],
    },
  },
}

export type Components =
  | 'action'
  | 'text'
  | 'image'
  | 'background'
  | 'gallery'
  | 'video'
  | 'field'
  | 'menu'
  | 'process'
  | 'list'
  | 'form'
  | 'alias'
  | 'aside'
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

export const components = {
  action,
  text,
  image,
  background,
  gallery,
  video,
  field,
  menu,
  process,
  list,
  alias,
  aside,
  wrapper,
  carousel,
  map,
  form,
  section,
  nav,
  page,
  article,
  location,
  course,
  person,
  event,
}
