import type { PictureProps, WrapperProps } from '@props/types'
import { Card, CardBody, CardHeader } from '@heroui/react'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import Image from 'next/image'
import { tv } from 'tailwind-variants'

interface WrapperComponent {
  blok: WrapperProps
}

const classes = tv({
  base: 'col-span-12 sm:order-none flex flex-col flex-wrap ',
  variants: {
    size: {
      '1/4': 'md:col-span-3',
      '1/3': 'sm:col-span-4',
      '1/2': 'sm:col-span-6',
      '2/3': 'sm:col-span-8',
      '3/4': 'sm:col-span-9',
    },
    justify: {
      'items-right': 'items-start',
      'items-center': 'items-center',
      'items-left': 'items-end',
      'justify-right': 'justify-start',
      'justify-center': 'justify-center',
      'justify-left': 'justify-end',
    },
    row: {
      true: 'flex-row sm:max-md:col-span-12',
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
})

export function Wrapper({ blok }: WrapperComponent) {
  return (
    <div
      {...storyblokEditable(blok)}
      className={classes({
        size: blok.size,
        row: blok.row,
        justify: `${blok.row ? 'justify' : 'items'}-${blok.justify}`,
        order: blok.order,
      })}
    >
      {blok.contents.map((content, index) => (
        <StoryblokComponent key={index} blok={content} />
      ))}
    </div>
  )
}

{
  /* <Card
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
    ? { backgroundImage: `url(${background.asset[0].filename})` }
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
</Card> */
}
