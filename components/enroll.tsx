import type { EnrollProps } from '@props/types'
import { tv } from 'tailwind-variants'
import { StoryblokComponent } from '@storyblok/react'
import { Meta } from '@components/meta'
import { Nav } from '@components/nav'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { getLongDate, getShortDate } from '@modules/formats'
import { span } from 'framer-motion/client'

interface EnrollComponent {
  blok: EnrollProps
}

export function Enroll({ blok }: EnrollComponent) {
  const courses = blok.courses.map(({ content }) => ({
    ...content,
    location: JSON.parse(content.location),
  }))
  const options = courses.map((course) => {
    const key = `${course.program} - ${course.location.city} - ${course.hours.includes('20:00/23:00') ? 'serale' : 'sabato'}`
    return { name: key, value: key }
  })
  const containerClasses = tv({
    base: 'grid grid-cols-12 gap-3 p-6 mx-auto max-w-[1280px]',
    variants: {
      reverseAligment: {
        true: 'flex-row-reverse text-right',
      },
    },
  })
  return (
    <>
      <Meta {...blok} />
      {blok.header && <Nav blok={blok.header.content} />}
      {!!blok.body.length && <StoryblokComponent blok={blok.body[0]} />}
      <div className={containerClasses()}>
        <div className='order-last md:order-1 col-span-full md:col-span-8'>
          {!!blok.body.length &&
            blok.body.map((body, index) =>
              !!index ? (
                <StoryblokComponent
                  blok={body}
                  parent={body.component}
                  key={index}
                />
              ) : null
            )}
        </div>
        <div className='sticky md:top-20 col-span-full md:col-span-4 flex flex-col align-start justify-start -mt-10 md:-mt-20 lg:-mt-48 px-2 py-3 order-1 md:order-last max-h-fit bg-background shadow-lg rounded-3xl border-neutral-100/25 border-2'>
          <h2 className='font-serif mb-3 px-2'>
            <span className='text-2xl mb-2'>Corso a partire da</span>
            <wbr />
            <strong className='text-6xl leading-1'> 500</strong>€
            <br />
            <span className='text-lg'> al mese per 10 rate.</span>
          </h2>
          {!!blok.courses.length && (
            <Accordion selectionMode='multiple'>
              {courses.map((course, index) => (
                <AccordionItem
                  title={
                    <h4 className='font-bold tex-xl'>{course.location.city}</h4>
                  }
                  subtitle={
                    <small>
                      {course.hours.includes('20:00/23:00')
                        ? 'Frequenza serale'
                        : 'Frequenza al sabato'}
                    </small>
                  }
                  key={index}
                >
                  <ul className='text-sm space-y-1'>
                    <li className='space-x-0.5'>
                      <i className='iconoir-calendar pr-1' />
                      <span className='md:max-lg:hidden'>lezioni:</span>
                      <span>{course.days.join(', ')}</span>
                    </li>
                    <li className='space-x-0.5'>
                      <i className='iconoir-clock pr-1' />
                      <span className='md:max-lg:hidden'>orari:</span>
                      <span>{course.hours.join(', ')}</span>
                    </li>
                    <li className='space-x-0.5'>
                      <i className='iconoir-calendar-arrow-up pr-1' />
                      <span className='md:max-lg:hidden'>inizio:</span>
                      <span>{getLongDate(new Date(course.starts))}</span>
                    </li>
                    {course.ends && (
                      <li className='space-x-0.5'>
                        <i className='iconoir-calendar-arrow-down pr-1' />
                        <span className='md:max-lg:hidden'>inizio:</span>
                        {getShortDate(new Date(course.ends))}
                      </li>
                    )}
                    <li className='space-x-0.5'>
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
        </div>
      </div>
      {blok.footer && <footer>footer</footer>}
    </>
  )
}
