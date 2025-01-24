import { WrapperProps } from '@props/types'
import { storyblokEditable } from '@storyblok/react'
import { StoryblokComponent } from '@storyblok/react'
import { tv } from 'tailwind-variants'

interface WrapperComponent {
  blok: WrapperProps
  centered?: boolean
}
export function Wrapper({ blok, centered }: WrapperComponent) {
  return (
    <div
      className={classes({
        widths: blok?.styles.findLast((s) => s.endsWith('Width')),
        centered: centered,
        reorderFirst: blok?.styles.includes('reorderFirst'),
        asRow: blok?.styles.includes('asRow'),
      })}
      {...storyblokEditable(blok)}
    >
      {blok.body.map((blok, index) => (
        <StoryblokComponent blok={blok} key={index} />
      ))}
    </div>
  )
}

const classes = tv({
  base: 'flex flex-col gap-6 col-span-12 sm:col-span-6',
  variants: {
    widths: {
      fullWidth: 'sm:col-span-12',
      threeQuarterWidth: 'sm:col-span-9',
      twoThirdWidth: 'sm:col-span-8',
      halfWidth: 'sm:col-span-6',
      thirdWidth: 'sm:col-span-4',
      quarterWidth: 'sm:col-span-3',
    },
    reorderFirst: {
      true: 'order-first sm:order-none',
    },
    centered: {
      true: 'sm:col-start-4',
    },
    asRow: {
      true: 'flex-row items-stretch',
    },
  },
  compoundVariants: [
    {
      widths: 'threeQuarterWidth',
      centered: true,
      class: 'sm:col-start-2 sm:col-span-10',
    },
    {
      widths: 'twoThirdWidth',
      centered: true,
      class: 'sm:col-start-3',
    },
    {
      widths: 'halfWidth',
      centered: true,
      class: 'sm:col-start-4',
    },
    {
      widths: 'thirdWidth',
      centered: true,
      class: 'sm:col-start-5',
    },
    {
      widths: 'quarterWidth',
      centered: true,
      class: 'sm:col-start-5 sm:col-span-4',
    },
  ],
})
