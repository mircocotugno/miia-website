export type StoryProps = {
  id: string
  uuid: string
  full_slug: string
  name: string
  tag_list: Array<string>
  content: BlokProps
}

export type BlokProps = {
  _uid?: string
  component?: string
}

export type EntryProps = {
  id: number
  name: string
  value: string
}

export type RefProps = {
  content: StoryProps
}

export type LinkProps = {
  cached_url: string
  linktype: 'story' | 'url'
  url: string
  target?: '_blank'
}

export type ImageProps = {
  filename: string
  alt: string
  title: string
  source: string
  copyright: string
  focus: string
}

// Sources Props

export type StudentProps = {
  name: string
  email: string
}

export type LocationProps = {
  city: string
  address: string
  cap: string
  phone: string
  email: string
  position: {
    lat: number
    lng: number
  }
  direction: string
}

export type PriceProps = {
  low: number
  total: number
  installments: Array<{
    installments: number
    price: number
    total: number
  }>
}

// Props

type CoachRoles = 'progettazione' | 'stile e disegno' | 'software CAD'

type CoursePrograms =
  | 'interior base'
  | 'fashion base'
  | 'interior avanzato'
  | 'fashion avanzato'

type CourseFrequencies =
  | 'Martedì e Giovedì - 20:00/23:00'
  | 'Sabato - 9:00/16:00'
  | 'Lunedì e Mercoledì - 20:00/23:00'

type FormScopes = 'contact' | 'openday' | 'enroll'

type InputTypes =
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

// Components Props

export type CoachProps = BlokProps & {
  image: ImageProps
  name: string
  role: CoachRoles
  about: string
  links: Array<ActionProps>
}

// export type StudentProps = BlokProps & {
//   asset: ImageProps
//   name: string
//   review: string
//   links: Array<ActionProps>
// }

export type CourseProps = BlokProps & {
  program: CoursePrograms
  location: LocationProps
  frequency: CourseFrequencies
  starts: string
  ends: string
  seats: number
  link: LinkProps
}

export type MetaProps = {
  title?: string
  description?: string
  image?: ImageProps
}

export type PageProps = BlokProps &
  MetaProps & {
    header: StoryProps & {
      content: NavProps
    }
    footer: StoryProps & {
      content: NavProps
    }
    body: Array<SectionProps>
  }

export type ArticleProps = BlokProps &
  MetaProps & {
    author: CoachProps
    body: Array<object>
  }

export type EnrollProps = BlokProps &
  MetaProps & {
    header: object
    footer: object
    headline: string
    price: PriceProps
    courses: Array<CoachProps>
    form: FormProps
    body: Array<object>
  }

export type CoverProps = BlokProps & {
  body: Array<object>
  background: ImageProps
}

export type SectionProps = BlokProps & {
  headline?: string
  body: Array<object>
  footer: Array<ActionProps>
}

export type NavProps = BlokProps & {
  navigation: Array<ActionProps>
  actions: Array<ActionProps>
  message: string
}

export type GridProps = BlokProps & {
  items: Array<StoryProps>
}

export type MapProps = BlokProps & {
  locations: Array<string>
}

export type FormProps = BlokProps & {
  scope: FormScopes
  body: Array<FieldProps>
  message: string
}

export type FieldProps = BlokProps & {
  id: string
  input: InputTypes
  label: string
  placeholder: string
  required: boolean
  options: string
}

export type HeadingProps = BlokProps & {
  body: string
}

export type ContentProps = BlokProps & {
  body: string
}

export type ActionProps = BlokProps & {
  id?: string
  label: string
  link: LinkProps
}

export type AliasProps = BlokProps & {
  item: object
}

export type GalleryProps = BlokProps & {
  images: Array<ImageProps>
}

export type ComponentsProps =
  | CoachProps
  | StudentProps
  | CourseProps
  | MetaProps
  | PageProps
  | ArticleProps
  | EnrollProps
  | CoverProps
  | SectionProps
  | NavProps
  | GridProps
  | MapProps
  | FormProps
  | FieldProps
  | HeadingProps
  | ContentProps
  | ActionProps
  | AliasProps
  | GalleryProps
