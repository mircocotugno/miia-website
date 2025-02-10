import type { PictureProps, WrapperProps, ImageProps } from '@props/types'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import Image from 'next/image'
import { tv } from 'tailwind-variants'

interface WrapperComponent {
  blok: WrapperProps
}

export function Wrapper({ blok }: WrapperComponent) {
  const hasPicture = blok.contents.some(
    ({ component }) => component === 'picture'
  )
  const hasBackground = blok.contents.findIndex(
    (content): content is PictureProps =>
      content.component === 'picture' && !!content?.background
  )
  const background: PictureProps | undefined = blok.contents.find(
    (content): content is PictureProps =>
      content.component === 'picture' && !!content?.background
  )

  const classes = tv({
    base: 'col-span-12 sm:col-span-6 sm:order-none',
    variants: {
      size: {
        small: 'sm:col-span-6 md:col-span-3',
        medium: 'sm:col-span-4',
        large: 'sm:col-span-8',
        extra: 'sm:col-span-9',
        full: 'sm:col-span-12',
      },
      justify: {
        right: 'items-start',
        center: 'items-center',
        left: 'items-end',
      },
      boxed: {
        false:
          'flex flex-wrap flex-col gap-x-2 gap-y-4 md:gap-x-4 lg:gap-x-8 p-0 sm:p-1 md:p-2 lg:p-3',
        true: 'p-2 ',
      },
      row: {
        true: 'flex-row',
      },
      hasBackground: {
        true: 'bg-cover bg-center min-h-md px-4 py-6 rounded-lg overflow-hidden justify-end text-background [&>*]:drop-shadow',
      },
      order: {
        first: 'order-first',
        second: '-order-7',
        third: '-order-6',
        fourth: '-order-5',
        fifth: '-order-4',
        sixth: '-order-3',
        seventh: '-order-2',
        eighth: '-order-1',
        last: 'order-last',
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
        justify: 'right',
        class: 'justify-start',
      },
      {
        row: true,
        justify: 'center',
        class: 'justify-center',
      },
      {
        row: true,
        justify: 'left',
        class: 'justify-end',
      },
    ],
  })

  if (blok.boxed) {
    return (
      <Card
        {...storyblokEditable(blok)}
        className={classes({
          size: blok.size,
          row: blok.row,
          boxed: true,
          order: blok.order,
          hasBackground: hasBackground >= 0,
        })}
        style={
          background
            ? { backgroundImage: `url(${background.asset.filename})` }
            : undefined
        }
      >
        {!background && hasPicture && (
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
        order: blok.order,
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
      {background && (
        <Image
          src={background.asset.filename}
          alt={background.asset.alt}
          priority={true}
          fill={true}
          className='object-cover object-center -z-20'
        />
      )}
    </div>
  )
}
