import type { VideoProps } from '@props/types'
import { YouTubeEmbed } from '@next/third-parties/google'
import { storyblokEditable } from '@storyblok/react'

interface VideoComponent {
  blok: VideoProps
}

const sizes = {
  sm: 256,
  md: 386,
  lg: 768,
  xl: 1024,
}

export default function Video({ blok }: VideoComponent) {
  if (!blok.source) return null

  const size = blok.size ? sizes[blok.size] : 512

  return (
    <YouTubeEmbed
      {...storyblokEditable(blok)}
      videoid={blok.source}
      width={size}
      params='?rel=0&modestbranding=1&autohide=1&showinfo=0&mute=1&showinfo=0&controls=0'
    />
  )
}
