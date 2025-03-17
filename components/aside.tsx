import type { AsideProps } from '@props/types'
import type { LocationProps, OptionProps } from '@props/types'
import { tv } from 'tailwind-variants'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { Accordion, AccordionItem } from '@heroui/react'
import { getLongDate, getShortDate } from '@modules/formats'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'

interface AsideComponent {
  blok: AsideProps
  locations: Array<LocationProps>
}

export default function Aside({ blok, locations }: AsideComponent) {
  const options: Array<OptionProps> = []
  const courses =
    blok.courses.length > 0 &&
    blok.courses.map(({ content }) => {
      content?.title && options.push({ name: content.title, value: content.id })
      const location =
        locations[
          locations.findIndex((location) => location.uuid === content.location)
        ]
      const starts = content?.starts && getLongDate(content.starts)
      const ends = content?.ends && getShortDate(content.ends)
      return { ...content, location, starts, ends }
    })


  return (
    <section
      id={blok.id}
      className={sectionClasses({ theme: blok.theme })}
      {...storyblokEditable(blok)}
    >
      <div className={containerClasses()}>
        {!!blok.contents.length && (
          <div className='order-last md:order-1 col-span-full md:col-span-8 space-y-4 md:space-y-6'>
            {!!blok.contents.length &&
              blok.contents.map((content, index) => (
                <StoryblokComponent
                  blok={content}
                  parent={content.component}
                  key={index}
                />
              ))}
          </div>
        )}
        <aside className={asideClasses({ theme: blok.theme })}>
          {blok.headline &&
            compiler(blok.headline, {
              wrapper: ({ children }) => (
                <div className='font-serif mb-3 px-2'>{children}</div>
              ),
              overrides: Typography({}),
            })}
          {!!courses && (
            <Accordion selectionMode='multiple'>
              {courses.map((course, index) => (
                <AccordionItem
                  title={<h4 className='font-bold tex-xl'>{course.title}</h4>}
                  subtitle={
                    course?.hours && (
                      <small>
                        {course.hours.includes('20:00/23:00')
                          ? 'Frequenza serale'
                          : 'Frequenza al sabato'}
                      </small>
                    )
                  }
                  key={index}
                >
                  <ul className='text-sm space-y-1'>
                    {course?.days && (
                      <li className='space-x-1'>
                        <i className='iconoir-calendar pr-1' />
                        <span className='md:max-lg:hidden'>lezioni:</span>
                        <span>{course.days.join(', ')}</span>
                      </li>
                    )}
                    {course?.hours && (
                      <li className='space-x-1'>
                        <i className='iconoir-clock pr-1' />
                        <span className='md:max-lg:hidden'>orari:</span>
                        <span>{course.hours.join(', ')}</span>
                      </li>
                    )}
                    <li className='space-x-1'>
                      <i className='iconoir-calendar-arrow-up pr-1' />
                      <span className='md:max-lg:hidden'>inizio:</span>
                      <span>{course.starts || 'in programmazione'}</span>
                    </li>
                    {course.ends && (
                      <li className='space-x-1'>
                        <i className='iconoir-calendar-arrow-down pr-1' />
                        <span className='md:max-lg:hidden'>inizio:</span>
                        <span>{course.ends}</span>
                      </li>
                    )}
                    <li className='space-x-1'>
                      <i className='iconoir-group pr-1' />
                      <span className='md:max-lg:hidden'>posti:</span>
                      <span>{course.seats}</span>
                    </li>
                  </ul>
                </AccordionItem>
              ))}
            </Accordion>
          )}
          {blok.form && (
            <StoryblokComponent blok={blok.form.content} courses={options} />
          )}
        </aside>
      </div>
    </section>
  )
}

const sectionClasses = tv({
  base: 'py-6 sm:py-8 md:py-10 lg:py-12 min-h-12',
  variants: {
    theme: {
      dark: 'dark text-foreground bg-background',
    },
  },
})

const asideClasses = tv({
  base: 'sticky md:top-20 col-span-full md:col-span-4 flex flex-col align-start justify-start sm:-mt-32 px-2 py-3 order-1 md:order-last max-h-fit bg-background shadow-aside rounded-3xl border-1',
  variants: {
    theme: {
      DEFAULT: 'border-neutral-200',
      dark: 'border-neutral-900',
    },
  },
})

const containerClasses = tv({
  base: 'grid grid-cols-12 gap-3 p-6 mx-auto max-w-[1280px]',
})