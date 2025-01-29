import type { EnrollProps, LocationProps, OptionProps } from '@props/types'
import { tv } from 'tailwind-variants'
import { StoryblokComponent } from '@storyblok/react'
import { Meta } from '@components/meta'
import { Nav } from '@components/nav'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { getLongDate, getShortDate } from '@modules/formats'
import { compiler } from 'markdown-to-jsx'
import { Typography } from './typography'

interface EnrollComponent {
  blok: EnrollProps
  locations: Array<LocationProps>
}

export function Enroll({ blok, locations }: EnrollComponent) {
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
      {blok.header && <Nav parent='header' blok={blok.header.content} />}
      <main className='min-h-screen'>
        {!!blok.body.length && <StoryblokComponent blok={blok.body[0]} />}
        {!!blok.courses.length && (
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
            <Aside blok={blok} locations={locations} />
          </div>
        )}
      </main>
      {blok.footer && <Nav parent='footer' blok={blok.footer.content} />}
    </>
  )
}

function Aside({ blok, locations }: EnrollComponent) {
  const options: Array<OptionProps> = []
  const courses =
    blok.courses.length > 0 &&
    blok.courses.map(({ content }) => {
      options.push({ name: content.title, value: content.title })
      const location = locations.findIndex(
        (location) => location.uuid === content.location
      )
      return { ...content, location: locations[location] }
    })

  console.log(blok.form)

  return (
    <div className='sticky md:top-20 col-span-full md:col-span-4 flex flex-col align-start justify-start -mt-10 md:-mt-20 lg:-mt-48 px-2 py-3 order-1 md:order-last max-h-fit bg-background shadow-lg rounded-3xl border-neutral-100/25 border-2'>
      {blok.headline &&
        compiler(blok.headline, {
          wrapper: ({ children }) => (
            <div className='font-serif mb-3 px-2'>{children}</div>
          ),
          overrides: Typography,
        })}
      {!!courses && (
        <Accordion selectionMode='multiple'>
          {courses.map((course, index) => (
            <AccordionItem
              title={<h4 className='font-bold tex-xl'>{course.title}</h4>}
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
                  <span>
                    {course.starts
                      ? getLongDate(new Date(course.starts))
                      : 'in programmazione'}
                  </span>
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
      {blok.form && <StoryblokComponent blok={blok.form.content} courses={options} />}
    </div>
  )
}
