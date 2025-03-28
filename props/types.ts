export type StoryProps = {
  id: string
  uuid: string
  full_slug: string
  name: string
  tag_list: Array<string>
  content: BlokProps
}

export type BlokProps = {
  id: string
  _uid: string
  uuid: string
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
  anchor?: string
}

export type ImageData = {
  filename: string
  alt: string
  title: string
  source: string
  copyright: string
  focus: string
}

export type ImageArray = ImageData & {
  id: number
}

export type OptionProps = {
  name: string
  value: string
}

// Props

export type Sizes = 'small' | 'medium' | 'large' | 'extra' | 'full'

export type Justifications = 'right' | 'center' | 'left'

type CourseDays =
  | 'Lunedì'
  | 'Martedì'
  | 'Mercoledì'
  | 'Giovedì'
  | 'Venerdì'
  | 'Sabato'

type CourseHours = '9:00/12:00' | '13:00/16:00' | '20:00/23:00'

export type FormScopes = 'corsi' | 'aziende' | 'progetti' | 'docenza'

export type FormArea = 'interni' | 'moda'

type InputTypes =
  | 'text'
  | 'number'
  | 'email'
  | 'tel'
  | 'date'
  | 'checkbox'
  | 'area'
  | 'select'
  | 'multiple'
  | 'hidden'
  | 'enroll'

// Components Props

export type ComponentsProps =
  | ActionProps
  | TextProps
  | ImageProps
  | GalleryProps
  | FieldProps
  | ListProps
  | ProcessProps
  | MenuProps
  | AliasProps
  | WrapperProps
  | CarouselProps
  | MapProps
  | FormProps
  | SectionProps
  | NavProps
  | MetaProps
  | PageProps
  | ArticleProps
  | LocationProps
  | CourseProps
  | PersonProps
  | EventProps

export type ActionProps = BlokProps & {
  component: 'action'
  id: string
  label: string
  link: LinkProps
  button: boolean
  color: 'primary' | 'secondary'
}

export type TextProps = BlokProps & {
  component: 'text'
  title: string
  description: string
  justify: Justifications
  hide: 'title' | 'description' | 'all'
  width: Array<'1/4' | '1/3' | '1/2' | '2/3' | '3/4' | '1/1'>
  order: number
  theme: 'primary' | 'secondary'
}

export type ImageProps = BlokProps & {
  component: 'image'
  image: ImageData
  fullScreen: boolean
  aspect: '1/1' | '3/4' | '4/3' | '9/4' | '4/9'
  width: Array<'1/4' | '1/3' | '1/2' | '2/3' | '3/4' | '1/1'>
  size: 'sm' | 'md' | 'lg'
  order: number
  author: PersonProps
}

export type BackgroundProps = BlokProps & {
  component: 'background'
  image: ImageData
  video: string
  position: Array<'right' | 'center' | 'left'>
  author: PersonProps
}

export type GalleryProps = BlokProps & {
  component: 'gallery'
  images: Array<ImageArray>
  fullScreen: boolean
  aspect: '1/1' | '3/4' | '4/3'
}

export type VideoProps = BlokProps & {
  component: 'video'
  source: string
  width: Array<'1/4' | '1/3' | '1/2' | '2/3' | '3/4' | '1/1'>
  order: number
}

export type FieldProps = BlokProps & {
  component: 'field'
  id: string
  input: InputTypes
  label: string
  placeholder: string
  required: boolean
  options: string | Array<OptionProps>
}

export type MenuProps = BlokProps & {
  component: 'menu'
  title: string
  links: Array<ActionProps>
  inline: boolean
}

export type ProcessProps = BlokProps & {
  component: 'process'
  title: string
  steps: Array<WrapperProps>
}

export type ListProps = BlokProps & {
  component: 'list'
  items: Array<TextProps>
  size: '1/4' | '1/3' | '1/2' | '2/3' | '3/4'
}

export type AliasProps = BlokProps & {
  component: 'alias'
  resource: 'next-event' | 'last-article'
  filter: string
  form: StoryProps & { content: FormProps }
}

export type AsideProps = BlokProps & {
  component: 'aside'
  headline: string
  courses: Array<{
    content: Omit<CourseProps, 'location'> & { location: string }
  }>
  form: StoryProps & {
    content: FormProps
  }
  contents: Array<
    ImageProps | ListProps | TextProps | ActionProps | WrapperProps
  >
  id: string
  theme: 'dark'
}

export type WrapperProps = BlokProps & {
  component: 'wrapper'
  contents: (
    | ImageProps
    | VideoProps
    | TextProps
    | ActionProps
    | GalleryProps
    | ListProps
    | MenuProps
    | MapProps
    | CourseProps
    | PersonProps
    | EventProps
  )[]
  row: boolean
  boxed: boolean
  size: '1/4' | '1/3' | '1/2' | '2/3' | '3/4'
  width: Array<'1/4' | '1/3' | '1/2' | '2/3' | '3/4' | '1/1'>
  justify: Justifications
  order: number
}

export type CarouselProps = BlokProps & {
  component: 'carousel'
  id: string
  slides: Array<SectionProps | WrapperProps | PersonProps>
  view: number
  delay: number
  order: number
}

export type MapProps = BlokProps & {
  component: 'map'
  locations: Array<StoryProps & { content: LocationProps }>
}

export type SectionProps = BlokProps & {
  component: 'section'
  contents: Array<
    | WrapperProps
    | BackgroundProps
    | ProcessProps
    | ListProps
    | TextProps
    | ActionProps
    | CarouselProps
    | MapProps
    | LocationProps
    | PersonProps
    | EventProps
    | CourseProps
    | ArticleProps
    | FormProps
  >
  id: string
  dark: boolean
  contain: boolean
  align: Array<'start' | 'center' | 'end' | 'stretch'>
}

export type NavProps = BlokProps & {
  component: 'nav'
  contents: Array<ActionProps | MenuProps | ListProps>
  message: string
}

export type MetaProps = {
  title: string
  description: string
  image: ImageData | undefined
}

export type PageProps = BlokProps & {
  component: 'page'
  title: string
  description: string
  image: ImageData
  header: StoryProps & {
    content: NavProps
  }
  footer: StoryProps & {
    content: NavProps
  }
  body: Array<SectionProps | CarouselProps | MapProps | AsideProps>
}

export type ArticleProps = BlokProps & {
  component: 'article'
  ref: StoryProps & { content: ArticleProps }
  title: string | ''
  description: string | ''
  image: ImageData
  author: StoryProps & {
    content: PersonProps
  }

  body: Array<SectionProps | AsideProps>
}

export type LocationProps = BlokProps & {
  component: 'location'
  ref: StoryProps & { content: LocationProps }
  title: string
  address: string
  gps: string
  direction: string
}

export type CourseProps = BlokProps & {
  component: 'course'
  ref: StoryProps & { content: CourseProps }
  id: string
  title: string
  location: LocationProps
  days: Array<CourseDays>
  hours: Array<CourseHours>
  starts: string
  ends: string
  seats: number
  page: LinkProps
}

export type PersonProps = BlokProps & {
  component: 'person'
  ref: StoryProps & { content: PersonProps }
  image: Array<ImageData> | []
  video: string
  title: string
  role: 'interior' | 'style' | 'design' | 'software'
  description: string
  links: Array<ActionProps> | []
}

export type EventProps = BlokProps & {
  component: 'event'
  ref: StoryProps & { content: EventProps }
  title: string
  description: string
  location: LocationProps
  date: string
  page: LinkProps
}

// Brevo and form props

export type FormProps = BlokProps & {
  component: 'form'
  ref: StoryProps & { content: FormProps }
  scope: FormScopes
  title: string
  label: string
  fields: Array<FieldProps> | []
  message: string
}

export type FormData = {
  [key: string]: DataProps
}

export type DataProps = {
  id: string
  value: any
  required: boolean
  error: string | null
}

export type BrevoProps = {
  email?: string
  id?: number
  emailBlacklisted?: boolean
  smsBlacklisted?: boolean
  createdAt?: Date
  modifiedAt?: Date
  updateEnabled?: boolean
  listIds?: Array<number>
  attributes: BrevoAttributes
}

export type BrevoAttributes = {
  COGNOME: string
  NOME: string
  SMS: number
  [key: string]: string | number | Date
}
