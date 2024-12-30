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

export type LocationProps = string & {
  city: string
  address: string
  cap: string
  phone: string
  email: string
  lat: number
  lng: number
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

type CourseDays =
  | 'Lunedì'
  | 'Martedì'
  | 'Mercoledì'
  | 'Giovedì'
  | 'Venerdì'
  | 'Sabato'

type CourseHours = '9:00/12:00' | '13:00/16:00' | '20:00/23:00'

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
  days: Array<CourseDays>
  hours: Array<CourseHours>
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

export type PageProps = MetaProps & {
  header: StoryProps & {
    content: NavProps
  }
  footer: StoryProps & {
    content: NavProps
  }
  body: Array<SectionProps & CoverProps>
}

export type ArticleProps = MetaProps & {
  author: StoryProps & {
    content: CoachProps
  }
  body: Array<SectionProps>
}

export type EnrollProps = MetaProps & {
  header: StoryProps & {
    content: NavProps
  }
  footer: StoryProps & {
    content: NavProps
  }
  courses: Array<
    StoryProps & {
      content: CourseProps
    }
  >
  form: StoryProps & {
    content: FormProps
  }
  body: Array<SectionProps & CoverProps>
}

export type CoverProps = BlokProps & {
  body: Array<HeadingProps & ActionProps>
  background: ImageProps
  styles: ['themeDark' | 'justifyRight' | 'minHeight']
}

export type SectionProps = BlokProps & {
  headline?: string
  body: Array<
    ContentProps & GridProps & MapProps & GalleryProps & AccordionProps
  >
  footer: Array<ActionProps & AliasProps>
  styles: ['themeDark' | 'justifyCenter']
}

export type NavProps = BlokProps & {
  navigation: Array<ActionProps>
  actions: Array<ActionProps>
  message: string
}

export type GridProps = BlokProps & {
  items: Array<
    StoryProps & {
      content: CoachProps
    }
  >
}

export type MapProps = BlokProps & {
  locations: Array<LocationProps>
}

export type AccordionProps = BlokProps & {
  contents: Array<ContentProps>
}

export type FormProps = BlokProps & {
  scope: FormScopes
  body: Array<FieldProps>
  message: string
}

export type OptionProp = {
  name: string
  value: string
}

export type FieldProps = BlokProps & {
  id: string
  input: InputTypes
  label: string
  placeholder: string
  required: boolean
  options: string | Array<OptionProp>
}

export type HeadingProps = BlokProps & {
  body: string
}

export type ContentProps = BlokProps & {
  head: string
  body: string
}

export type ActionProps = BlokProps & {
  id?: string
  label: string
  link: LinkProps
}

export type AliasProps = BlokProps & {
  item: StoryProps & {
    content: ArticleProps & CoachProps & FormProps & StudentProps & CourseProps
  }
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
