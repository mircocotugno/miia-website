import type { WrapperProps, PictureProps } from '@cms/components'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'

interface WrapperComponent {
  blok: WrapperProps
}

export function Wrapper({ blok }: WrapperComponent) {
  const hasBackground = blok.contents.findIndex((c: any) => !!c?.background)
  const background: false | PictureProps =
    hasBackground >= 0 && blok.contents[hasBackground]

  if (blok.boxed) {
    return (
      <Card
        {...storyblokEditable(blok)}
        className={classes({
          size: blok.size,
          row: blok.row,
          boxed: true,
          hasBackground: hasBackground >= 0,
        })}
        style={
          background
            ? { backgroundImage: `url(${background.asset.filename})` }
            : undefined
        }
      >
        {!background && (
          <CardHeader className='z-10'>
            {blok.contents
              .filter((c) => c.component === 'picture')
              .map((content, index) => (
                <StoryblokComponent blok={content} key={index} />
              ))}
          </CardHeader>
        )}
        <CardBody className='z-10'>
          {blok.contents
            .filter((c) => c.component !== 'picture')
            .map((content, index) => (
              <StoryblokComponent blok={content} key={index} />
            ))}
        </CardBody>
      </Card>
    )
  }

  return (
    <div
      {...storyblokEditable(blok)}
      className={classes({
        size: blok.size,
        row: blok.row,
        boxed: false,
        justify: blok.justify,
        hasBackground: !!background,
      })}
      style={
        background
          ? { backgroundImage: `url(${background.asset.filename})` }
          : undefined
      }
    >
      {blok.contents.map((content, index) =>
        hasBackground !== index ? (
          <StoryblokComponent key={index} blok={content} />
        ) : null
      )}
    </div>
  )
}

const classes = tv({
  base: 'col-span-12 sm:col-span-6',
  variants: {
    size: {
      small: 'sm:col-span-3',
      medium: 'sm:col-span-4',
      large: 'sm:col-span-8',
      extra: 'sm:col-span-9',
    },
    justify: {
      right: 'items-start',
      center: 'items-center',
      left: 'items-end',
    },
    boxed: {
      false: 'flex flex-col gap-2 md:gap-4 lg:gap-6',
    },
    row: {
      true: 'flex-row',
    },
    hasBackground: {
      true: 'bg-cover bg-center min-h-md px-4 py-6 rounded-lg overflow-hidden justify-end text-background [&>*]:drop-shadow',
    },
  },
  compoundVariants: [
    {
      row: true,
      boxed: true,
      class: 'flex gap-2 md:gap-4 lg:gap-6',
    },
    {
      row: true,
      justify: "right",
      class: 'justify-start',
    },
    {
      row: true,
      justify: "center",
      class: 'justify-center',
    },
    {
      row: true,
      justify: "left",
      class: 'justify-end',
    },
  ],

})
