import type { VideoProps } from '@props/types'
import { YouTubeEmbed } from '@next/third-parties/google'
import { storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'

interface VideoComponent {
  blok: VideoProps
}

export default function Video({ blok }: VideoComponent) {
  if (!blok.source) return null
  const order: any = !!blok.order ? blok.order.toString() : 'none'
  return (
    <div
      {...storyblokEditable(blok)}
      className={classes({
        order: order,
        sm: blok.width?.[0],
        md: blok.width?.[1],
        lg: blok.width?.[2],
        xl: blok.width?.[3],
      })}
    >
      <YouTubeEmbed
        videoid={blok.source}
        params='?rel=0&modestbranding=1&autohide=1&showinfo=0&mute=1&showinfo=0&controls=0'
      />
    </div>
  )
}

const classes = tv({
  base: 'col-span-12 sm:order-none',
  variants: {
    order: {
      '1': '-order-1',
      '2': '-order-2',
      '3': '-order-3',
      '4': '-order-4',
      '5': '-order-5',
      '6': '-order-6',
    },
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
  },
})
