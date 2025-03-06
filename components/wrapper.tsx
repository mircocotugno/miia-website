import type { WrapperProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'

interface WrapperComponent {
  blok: WrapperProps
}

export default function Wrapper({ blok }: WrapperComponent) {
  return (
    <div
      {...storyblokEditable(blok)}
      className={classes({
        sm: blok.width?.[0],
        md: blok.width?.[1],
        lg: blok.width?.[2],
        xl: blok.width?.[3],
        row: blok.row,
        justify: `${blok.row ? 'justify' : 'items'}-${blok.justify}`,
        order: blok.order,
      })}
    >
      {blok.contents.map((content, index) => (
        <StoryblokComponent
          key={index}
          blok={content}
          parent={blok.component}
        />
      ))}
    </div>
  )
}

const classes = tv({
  base: 'col-span-12 order-none sm:order-none flex flex-col flex-wrap gap-4 min-h-12',
  variants: {
    sm: {
      '1/4': 'sm:col-span-3',
      '1/3': 'sm:col-span-4',
      '1/2': 'sm:col-span-6',
      '2/3': 'sm:col-span-8',
      '3/4': 'sm:col-span-9',
      '1/1': 'sm:col-span-12',
    },
    md: {
      '1/4': 'md:col-span-3',
      '1/3': 'md:col-span-4',
      '1/2': 'md:col-span-6',
      '2/3': 'md:col-span-8',
      '3/4': 'md:col-span-9',
      '1/1': 'md:col-span-12',
    },
    lg: {
      '1/4': 'lg:col-span-3',
      '1/3': 'lg:col-span-4',
      '1/2': 'lg:col-span-6',
      '2/3': 'lg:col-span-8',
      '3/4': 'lg:col-span-9',
      '1/1': 'lg:col-span-12',
    },
    xl: {
      '1/4': 'xl:col-span-3',
      '1/3': 'xl:col-span-4',
      '1/2': 'xl:col-span-6',
      '2/3': 'xl:col-span-8',
      '3/4': 'xl:col-span-9',
      '1/1': 'xl:col-span-12',
    },
    justify: {
      'items-right': 'items-end',
      'items-center': 'items-center',
      'items-left': 'items-start',
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

/* 
  {
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
    </Card> 
  }
*/
