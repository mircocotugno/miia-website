import type { CarouselProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

interface CarouselComponent {
  blok: CarouselProps
  parent?: 'page' | 'enroll' | 'section'
}

export default function Carousel({ blok, parent }: CarouselComponent) {
  if (!blok.slides.length) return null

  const isCarousel = blok.slides[0].component !== 'section'

  const slides = blok.slides.map((slide, index) => (
    <SwiperSlide
      {...storyblokEditable(slide)}
      className='overflow-visible min-h-inherit'
      key={index}
    >
      <StoryblokComponent blok={slide} parent={blok.component} />
    </SwiperSlide>
  ))

  const Tag = parent === 'page' ? 'section' : 'div'

  const order: any = !!blok.order ? blok.order.toString() : 'none'

  const autoplay = blok.delay > 0 ? { delay: 6500 - 1000 * blok.delay } : false

  const view = blok.view > 0 ? Number(blok.view) : 1
  const smView = blok.view > 0 ? view + 1 : 1
  const mdView = blok.view > 0 ? (view > 1 ? view * 2 : view + 1) : 1
  const xlView = blok.view > 0 ? (view > 1 ? view * 3 : view + 1) : 1

  return (
    <Tag
      id={blok.id && blok.id.replaceAll(' ', '-')}
      className={classes({
        order: order,
        isFullHeight: blok.slides[0].component === 'section',
      })}
    >
      <Swiper
        {...storyblokEditable(blok)}
        modules={[Autoplay]}
        loop={true}
        autoplay={autoplay}
        slidesPerView={view}
        spaceBetween={blok.view ? 24 : 0}
        className={'min-h-inherit'}
        wrapperClass={'min-h-inherit'}
        breakpoints={{
          768: { slidesPerView: smView },
          1024: { slidesPerView: mdView },
          1280: { slidesPerView: xlView },
        }}
      >
        {slides}
      </Swiper>
    </Tag>
  )
}

const classes = tv({
  base: 'order-last sm:order-none w-full col-span-12',
  variants: {
    order: {
      '1': '-order-1',
      '2': '-order-2',
      '3': '-order-3',
      '4': '-order-4',
      '5': '-order-5',
      '6': '-order-6',
    },
    isFullHeight: {
      false: 'min-h-sm',
      true: 'min-h-cover sm:min-h-lg',
    },
  },
})
