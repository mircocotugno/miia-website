import { CarouselProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Column } from '@components/column'

interface CarouselComponent {
  blok: CarouselProps
  parent?: string
}

export function Carousel({ blok, parent }: CarouselComponent) {
  if (!blok.items.length) return null
  const isCarousel = blok.items[0].component === 'content'

  return (
    <Column parent={parent} classes='flex-0 w-full'>
      <Swiper
        {...storyblokEditable(blok)}
        modules={[Autoplay]}
        loop={true}
        autoplay={isCarousel ? { delay: 1500 } : false}
        slidesPerView={isCarousel ? 9 : 1}
        spaceBetween={isCarousel ? 120 : 0}
        breakpoints={{
          320: {
            slidesPerView: isCarousel ? 3 : 1,
            spaceBetween: isCarousel ? 40 : 0,
          },
          640: {
            slidesPerView: isCarousel ? 6 : 1,
            spaceBetween: isCarousel ? 80 : 0,
          },
        }}
      >
        {blok.items.map((item, index) => (
          <SwiperSlide key={index}>
            <StoryblokComponent blok={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Column>
  )
}
