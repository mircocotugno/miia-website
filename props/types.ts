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

type DisplayModes = 'dropdown' | 'tab' | 'accordion'

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
  | EnrollProps
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
  items: Array<TextProps | ActionProps>
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

export type WrapperProps = BlokProps & {
  component: 'wrapper'
  contents: (
    | PictureProps
    | TextProps
    | ActionProps
    | GalleryProps
    | ListProps
    | AliasProps
  )[]
  row: boolean
  boxed: boolean
  size: Sizes
  justify: Justifications
  order: number
}

export type CarouselProps = BlokProps & {
  component: 'carousel'
  slides: Array<SectionProps | WrapperProps>
  weight: 'low' | 'high'
}

export type MapProps = BlokProps & {
  component: 'map'
  locations: Array<LocationProps>
}

export type FormProps = BlokProps & {
  component: 'form'
  scope: FormScopes
  fields: Array<FieldProps>
  message: string
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
  >
  theme: 'dark'
  contain: boolean
  id: string
}

export type NavProps = BlokProps & {
  component: 'nav'
  contents: Array<ActionProps | ListProps>
  message: string
}

export type MetaProps = {
  title?: string
  description?: string
  image?: ImageProps
}

export type PageProps = BlokProps &
  MetaProps & {
    component: 'page'
    header: StoryProps & {
      content: NavProps
    }
    footer: StoryProps & {
      content: NavProps
    }
    body: Array<SectionProps & CarouselProps>
  }

export type EnrollProps = BlokProps &
  MetaProps & {
    component: 'enroll'
    header: StoryProps & {
      content: NavProps
    }
    footer: StoryProps & {
      content: NavProps
    }
    headline: string
    courses: Array<{
      content: Omit<CourseProps, 'location'> & { location: string }
    }>
    form: StoryProps & {
      content: FormProps
    }
    body: Array<SectionProps | CarouselProps>
  }

export type ArticleProps = BlokProps &
  MetaProps & {
    component: 'article'
    author: StoryProps & {
      content: PersonProps
    }
    body: Array<SectionProps>
  }

export type LocationProps = BlokProps & {
  component: 'location'
  title: string
  address: string
  gps: string
  direction: string
}

export type CourseProps = BlokProps & {
  component: 'course'
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
  image: Array<ImageProps>
  title: string
  description: string
  message: string
  links: Array<ActionProps>
}

export type EventProps = BlokProps & {
  component: 'event'
  title: string
  description: string
  location: LocationProps
  date: string
  page: LinkProps
}
