import { CarouselProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Container } from '@components/container'

interface CarouselComponent {
  blok: CarouselProps
  parent?: string
}

export function Carousel({ blok, parent }: CarouselComponent) {
  if (!blok.items.length) return null
  const isCarousel = blok.items[0].component === 'content'

  return (
    <Container wrap={parent === 'section'} classes='col-span-12'>
      <Swiper
        {...storyblokEditable(blok)}
        modules={[Autoplay]}
        loop={true}
        autoplay={isCarousel ? { delay: 1500 } : false}
        breakpoints={{
          320: {
            slidesPerView: isCarousel ? 3 : 1,
            spaceBetween: isCarousel ? 40 : 0,
          },
          480: {
            slidesPerView: isCarousel ? 4 : 1,
            spaceBetween: isCarousel ? 60 : 0,
          },
          768: {
            slidesPerView: isCarousel ? 6 : 1,
            spaceBetween: isCarousel ? 80 : 0,
          },
          1280: {
            slidesPerView: isCarousel ? 9 : 1,
            spaceBetween: isCarousel ? 120 : 0,
          },
        }}
      >
        {blok.items.map((item, index) => (
          <SwiperSlide key={index}>
            <StoryblokComponent blok={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}
