import type { CarouselProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

interface CarouselComponent {
  blok: CarouselProps
  parent?: 'page' | 'enroll' | 'section'
}

export function Carousel({ blok, parent }: CarouselComponent) {
  if (!blok.slides.length) return null

  const isCarousel = blok.slides[0].component !== 'section'
  const weights = { low: [1, 2, 3, 4], high: [3, 5, 7, 9] }
  const weight = blok.weight ? weights[blok.weight] : [2, 3, 4, 6]

  const slides = blok.slides.map((slide, index) => (
    <SwiperSlide
      className={`p-1 ${isCarousel ? 'min-h-sm overflow-visible' : 'min-h-cover sm:min-h-lg'}`}
      key={index}
    >
      <StoryblokComponent blok={slide} parent={blok.component} />
    </SwiperSlide>
  ))

  const Tag = parent === 'section' ? 'div' : 'section'
  const classes = tv({
    variants: {
      contain: {
        true: 'col-span-12',
      },
      carousel: {
        true: 'min-h-sm',
        false: 'min-h-cover sm:min-h-lg',
      },
    },
  })

  return (
    <Tag
      className={classes({
        carousel: isCarousel,
        contain: parent == 'section',
      })}
    >
      <Swiper
        {...storyblokEditable(blok)}
        modules={[Autoplay]}
        loop={true}
        autoplay={isCarousel ? { delay: 1500 } : false}
        slidesPerView={isCarousel ? weight[0] : 1}
        spaceBetween={isCarousel ? 24 : 0}
        className={isCarousel ? 'min-h-sm' : 'min-h-cover sm:min-h-lg'}
        wrapperClass={isCarousel ? 'min-h-sm' : 'min-h-cover sm:min-h-lg'}
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
    </Tag>
  )
}
