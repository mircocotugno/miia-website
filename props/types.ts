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

export type ImageProps = {
  filename: string
  alt: string
  title: string
  source: string
  copyright: string
  focus: string
}

export type OptionProps = {
  name: string
  value: string
}

// Props

export type Sizes = 'small' | 'medium' | 'large' | 'extra'

export type Justifications = 'right' | 'center' | 'left'

type CourseDays =
  | 'Lunedì'
  | 'Martedì'
  | 'Mercoledì'
  | 'Giovedì'
  | 'Venerdì'
  | 'Sabato'

type CourseHours = '9:00/12:00' | '13:00/16:00' | '20:00/23:00'

type FormScopes = 'contact' | 'openday' | 'enroll'

type DisplayModes = 'dropdown' | 'tab' | 'accordion' | 'timeline' | 'process'

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

export type ComponentsProps =
  | ActionProps
  | TextProps
  | PictureProps
  | GalleryProps
  | FieldProps
  | ListProps
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
}

export type TextProps = BlokProps & {
  component: 'text'
  title: string
  description: string
  justify: Justifications
  hide: 'title' | 'description' | 'all'
}

export type PictureProps = BlokProps & {
  component: 'picture'
  asset: ImageProps
  size: 'sm' | 'md' | 'lg' | 'xl'
  ratio: 'square' | 'portrait' | 'landscape' | 'circle'
  effect: 'blurred' | 'zoomed'
  background: boolean
  preview: boolean
}

export type GalleryProps = BlokProps & {
  component: 'gallery'
  assets: Array<ImageProps>
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

export type ListProps = BlokProps & {
  component: 'list'
  label: string
  items: Array<TextProps | ActionProps | EventProps>
  display: DisplayModes
}

export type AliasProps = BlokProps & {
  component: 'alias'
  resource: StoryProps & {
    content?:
      | LocationProps
      | PersonProps
      | EventProps
      | CourseProps
      | ArticleProps
      | FormProps
  }
  size: Sizes
  order: number
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
    PictureProps | ListProps | TextProps | ActionProps | WrapperProps
  >
  id: string
  theme: 'dark'
}

export type WrapperProps = BlokProps & {
  component: 'wrapper'
  contents: (
    | PictureProps
    | TextProps
    | ActionProps
    | GalleryProps
    | ListProps
    | MapProps
  )[]
  row: boolean
  boxed: boolean
  size: Sizes
  justify: Justifications
  order: 'first' | 'second' | 'third' | 'fourth' | 'last'
}

export type CarouselProps = BlokProps & {
  component: 'carousel'
  slides: Array<SectionProps | WrapperProps | PersonProps>
  weight: 'low' | 'high'
}

export type MapProps = BlokProps & {
  component: 'map'
  locations: Array<StoryProps & { content: LocationProps }>
}

export type FormProps = BlokProps & {
  component: 'form'
  ref: (StoryProps & { content: FormProps }) | undefined
  scope: FormScopes | undefined
  fields: Array<FieldProps> | []
  message: string | string
}

export type DataProps = {
  id: string
  value: any
  required: boolean
  error: string | null
}

export type SectionProps = BlokProps & {
  component: 'section'
  contents: Array<
    | PictureProps
    | ListProps
    | TextProps
    | ActionProps
    | WrapperProps
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
  theme: 'dark'
  contain: boolean
}

export type NavProps = BlokProps & {
  component: 'nav'
  contents: Array<ActionProps | ListProps>
  message: string
}

export type MetaProps = {
  title: string
  description: string
  image: ImageProps | undefined
}

export type PageProps = BlokProps & {
  component: 'page'
  title: string
  description: string
  image: ImageProps
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
  ref: (StoryProps & { content: ArticleProps }) | undefined
  title: string | ''
  description: string | ''
  image: ImageProps | undefined
  author:
    | (StoryProps & {
        content: PersonProps
      })
    | undefined
  body: Array<SectionProps | AsideProps> | undefined
}

export type LocationProps = BlokProps & {
  component: 'location'
  ref: (StoryProps & { content: LocationProps }) | undefined
  title: string | undefined
  address: string | undefined
  gps: string | undefined
  direction: string | undefined
}

export type CourseProps = BlokProps & {
  component: 'course'
  ref: (StoryProps & { content: CourseProps }) | undefined
  title: string | undefined
  location: LocationProps | undefined
  days: Array<CourseDays> | undefined
  hours: Array<CourseHours> | undefined
  starts: string | undefined
  ends: string | undefined
  seats: number | undefined
  page: LinkProps | undefined
}

export type PersonProps = BlokProps & {
  component: 'person'
  ref: (StoryProps & { content: PersonProps }) | undefined
  image: Array<ImageProps> | []
  title: string | undefined
  role: 'interior' | 'style' | 'design' | 'software' | undefined
  description: string | undefined
  message: string | undefined
  links: Array<ActionProps> | []
}

export type EventProps = BlokProps & {
  component: 'event'
  ref: (StoryProps & { content: EventProps }) | undefined
  title: string | undefined
  description: string | undefined
  location: LocationProps | undefined
  date: string | undefined
  page: LinkProps | undefined
}
