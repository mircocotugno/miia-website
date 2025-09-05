import type { Components } from '@cms/components'
import type { Groups } from '@cms/groups'
import type { Sources } from '@cms/sources'

export type GroupSchema = {
  name: string
}

export type PresetSchema = {
  name: string
  component_id: string
  preset: object
}

export type SourceSchema = {
  name: string
  slug: string
  dimensions_attributes?: Array<{ name: string; entry_value: string }>
}

export type EntrySchema = {
  name: string
  value: string | object
  datasource_id: string
}

export type ComponentSchema = {
  name: string
  display_name: string
  is_root: boolean
  is_nestable: boolean
  color?: `#${string}`
  icon?: string
  component_group_uuid: Groups | string | null
  preview_tmpl?: string
  schema: {
    [key: string]:
      | FieldBloksSchema
      | FieldBooleanSchema
      | FieldNumberSchema
      | FieldTextSchema
      | FieldMarkdownSchema
      | FieldRichTextSchema
      | FieldDateTimeSchema
      | FieldOptionSchema
      | FieldMultiOptionSchema
      | FieldImageSchema
      | FieldAssetSchema
      | FieldMultiAssetSchema
      | FieldMultiLinkSchema
      | FieldSectionSchema
  }
}

type FieldSchema = {
  display_name: string
  description?: string
  translatable?: boolean
  tooltip?: boolean
  required?: boolean
}

type FieldBaseSchema = FieldSchema & {
  type: string
  default_value?: string | number | boolean | Array<string>
  inline_label?: boolean
}

type FieldBooleanSchema = FieldBaseSchema & {
  type: 'boolean'
}

type FieldBloksSchema = FieldBaseSchema & {
  type: 'bloks'
  restrict_type?: string
  restrict_components?: boolean
  component_whitelist?: Array<Components>
  component_tag_whitelist?: Array<number>
  component_group_whitelist?: Array<Groups>
  maximum?: number
  minimum?: number
}

type FieldTextSchema = FieldBaseSchema & {
  type: 'text' | 'textarea'
  regex?: string
  rtl?: boolean
  max_length?: number
  no_translate?: boolean
}

type TextToolbarSchema = FieldBaseSchema & {
  customize_toolbar?: boolean
  toolbar: Array<
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'link'
    | 'inlinecode'
    | 'italic'
    | 'bold'
    | 'hrule'
    | 'paragraph'
    | 'list'
    | 'olist'
    | 'link'
    | 'quote'
    | 'image'
  >
}

type FieldMarkdownSchema = TextToolbarSchema & {
  type: 'markdown'
  rich_markdown?: boolean
  allow_multiline?: boolean
  max_length?: number
  rtl?: boolean
}

type OptionSchema = {
  _uid?: string
  name: string
  value: string | number
}

type FieldRichTextSchema = TextToolbarSchema & {
  type: 'richtext'
  allow_target_blank?: boolean
  allow_custom_attributes?: boolean
  style_options?: Array<OptionSchema>
}

type FieldNumberSchema = FieldBaseSchema & {
  type: 'number'
  min_value?: number
  max_value?: number
  decimals?: number
  steps?: number
  no_translate?: boolean
}

type FieldDateTimeSchema = FieldBaseSchema & {
  type: 'datetime'
  disable_time?: boolean
}

type FieldOptionBaseSchema = FieldBaseSchema & {
  type: 'option'
}

type FieldOptionSelfSchema = FieldOptionBaseSchema & {
  options: Array<OptionSchema>
  exclude_empty_option?: boolean
  allow_advanced_search?: boolean
}

type FieldOptionInternalStoriesSchema = FieldOptionBaseSchema & {
  source: 'internal_stories'
  restrict_content_types?: boolean
  filter_content_type?: Array<Components>
  allow_advanced_search?: boolean
  folder_slug?: string
}

type FieldOptionInternalSchema = FieldOptionBaseSchema & {
  source: 'internal'
  datasource_slug: string
  allow_advanced_search?: boolean
}

type FieldOptionExternalSchema = FieldOptionBaseSchema & {
  source: 'external'
  external_datasource: Sources
}

type FieldOptionSchema =
  | FieldOptionSelfSchema
  | FieldOptionInternalStoriesSchema
  | FieldOptionInternalSchema
  | FieldOptionExternalSchema

type FieldMultiOptionBaseSchema = Omit<FieldOptionSchema, 'type'> & {
  type: 'options'
  max_options?: number
  min_options?: number
}

type FieldMultiOptionSelfSchema = FieldMultiOptionBaseSchema & {
  options: Array<OptionSchema>
  exclude_empty_option?: boolean
  allow_advanced_search?: boolean
}

type FieldMultiOptionInternalStoriesSchema = FieldMultiOptionBaseSchema & {
  source: 'internal_stories'
  restrict_content_types?: boolean
  filter_content_type?: Array<Components>
  folder_slug?: string
}

type FieldMultiOptionInternalSchema = FieldMultiOptionBaseSchema & {
  source: 'internal'
  datasource_slug: string
}

type FieldMultiOptionExternalSchema = FieldMultiOptionBaseSchema & {
  source: 'external'
  external_datasource: Sources
}

type FieldMultiOptionSchema =
  | FieldMultiOptionSelfSchema
  | FieldMultiOptionInternalStoriesSchema
  | FieldMultiOptionInternalSchema
  | FieldMultiOptionExternalSchema

type FieldAssetSchema = FieldBaseSchema & {
  type: 'asset'
  filetypes?: Array<'images' | 'videos' | 'audios' | 'texts'>
  asset_folder_id?: number
  allow_external_url?: boolean
}

type FieldMultiAssetSchema = Omit<
  FieldAssetSchema,
  'type' | 'asset_folder_id'
> & {
  type: 'multiasset'
}

type FieldImageSchema = FieldBaseSchema & {
  type: 'image'
  image_crop?: boolean
  keep_image_size?: boolean
  image_width?: string
  image_height?: string
}

type FieldMultiLinkSchema = FieldBaseSchema & {
  type: 'multilink'
  restrict_content_types?: boolean
  component_whitelist?: Array<Components>
  link_scope?: string
  force_link_scope?: boolean
  show_anchor?: boolean
  asset_link_type?: boolean
  email_link_type?: boolean
}

type FieldSectionSchema = {
  type: 'section'
  display_name: string
  keys: Array<string>
}
