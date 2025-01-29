import type { CarouselProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

interface CarouselComponent {
  blok: CarouselProps
}

export function Carousel({ blok }: CarouselComponent) {
  if (!blok.slides.length) return null
  const isCarousel = blok.slides[0].component !== 'section'
  const weights = { low: [1, 2, 3, 4], high: [3, 5, 7, 9] }
  const weight = blok.weight ? weights[blok.weight] : [2, 3, 4, 6]

  const slides = blok.slides.map((slide, index) => (
    <SwiperSlide className={isCarousel ? 'min-h-sm': 'min-h-lg'} key={index}>
      <StoryblokComponent blok={slide} />
    </SwiperSlide>
  ))

  return (
    <section
      className={classes({ carousel: isCarousel })}
      {...storyblokEditable(blok)}
    >
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={isCarousel ? { delay: 1500 } : false}
        slidesPerView={isCarousel ? weight[0] : 1}
        spaceBetween={isCarousel ? 24 : 0}
        className={isCarousel ? 'min-h-sm' : 'min-h-lg'}
        wrapperClass={isCarousel ? 'min-h-sm' : 'min-h-lg'}
        breakpoints={{
          480: {
            slidesPerView: isCarousel ? weight[1] : 1,
          },
          1024: {
            slidesPerView: isCarousel ? weight[2] : 1,
          },
          1280: {
            slidesPerView: isCarousel ? weight[3] : 1,
          },
        }}
      >
        {slides}
      </Swiper>
    </section>
  )
}

const classes = tv({
  variants: {
    carousel: {
      true: 'py-6 lg:py-12 min-h-sm',
      false: 'min-h-lg',
    },
  },
})
