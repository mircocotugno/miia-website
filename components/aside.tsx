import type { AsideProps } from '@props/types'
import type { LocationProps, OptionProps } from '@props/types'
import { tv } from 'tailwind-variants'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { Accordion, AccordionItem } from '@heroui/react'
import { getLongDate, getShortDate } from '@modules/formats'
import { useIntersectionObserver } from 'usehooks-ts'

interface AsideComponent {
  blok: AsideProps
  locations: Array<LocationProps>
}

interface ListItemComponent {
  label: string
  icon: string
  value: string | number | null
}

const ListItem = ({ label, icon, value }: ListItemComponent) =>
  !!value && (
    <li className="space-x-1">
      <i className={`iconoir-${icon} pr-1`} />
      <span className="md:max-lg:hidden">{label}</span>
      <span>{value}</span>
    </li>
  )

interface PriceComponent {
  amount: number
  steps: number | null
}

const Price = ({ amount, steps }: PriceComponent) => (
  <h2 className="font-serif font-bold leading-compact inline-block align-middle lg:mx-2">
    {!!steps && (
      <span className="text-2xl lg:text-3xl leading-compact">
        A partire da{' '}
      </span>
    )}
    <span className="font-black text-4xl md:text-3xl lg:text-5xl mx-1 leading-compact">
      {amount}
      <small className="text-2xl lg:text-3xl mx-1 leading-compact">€</small>
    </span>
    {!!steps && (
      <span className="text-2xl lg:text-3xl hidden sm:inline-block leading-compact">
        per{' '}
        <span className="text-3xl lg:text-4xl leading-compact">{steps}</span>{' '}
        mesi
      </span>
    )}
    {/* <small className="italic hidden sm:inline-block"> - iva inclusa</small> */}
  </h2>
)

export default function Aside({ blok, locations }: AsideComponent) {
  const options: Array<OptionProps> = []
  const courses =
    blok.courses.length > 0 &&
    blok.courses.map(({ content }) => {
      content?.title &&
        options.push({
          name: content,
          value: content.id,
        })
      const location =
        locations[
          locations.findIndex((location) => location.uuid === content.location)
        ]
      const starts = content?.starts && getLongDate(content.starts)
      const ends = content?.ends && getShortDate(content.ends)
      return { ...content, location, starts, ends }
    })

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  })

  return (
    <section
      id={blok.id}
      className={sectionClasses({ theme: blok.theme })}
      {...storyblokEditable(blok)}
    >
      <div className="grid grid-cols-12 gap-3 p-6 mx-auto max-w-[1280px]">
        {!!blok.contents.length && (
          <div className="order-last md:order-1 col-span-full md:col-span-8 space-y-4 md:space-y-6">
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
        <aside ref={ref} className={asideClasses()}>
          <div
            className={bannerClasses({
              active: !isIntersecting,
            })}
          >
            <div className={containerClasses({ active: !isIntersecting })}>
              <Price amount={495} steps={10} />
              {!!courses && (
                <div className={!isIntersecting ? 'hidden' : ''}>
                  <Accordion selectionMode="multiple">
                    {courses.map((course, index) => (
                      <AccordionItem
                        key={index}
                        HeadingComponent="h4"
                        title={course.title}
                        subtitle={
                          course.hours.includes('20:00/23:00')
                            ? 'Frequenza serale'
                            : 'Frequenza al sabato'
                        }
                        classNames={{ title: 'font-bold tex-xl' }}
                      >
                        <ul className="text-sm space-y-1">
                          <ListItem
                            label="lezioni:"
                            icon="calendar"
                            value={course.days ? course.days.join(', ') : null}
                          />
                          <ListItem
                            label="orari:"
                            icon="clock"
                            value={
                              course.hours ? course.hours.join(', ') : null
                            }
                          />
                          <ListItem
                            label="inizio:"
                            icon="calendar-arrow-up"
                            value={course.starts || 'in programmazione'}
                          />
                          <ListItem
                            label="fine:"
                            icon="calendar-arrow-down"
                            value={course.ends}
                          />
                          <ListItem
                            label="posti:"
                            icon="group"
                            value={course.seats}
                          />
                        </ul>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
              {blok.form && (
                <StoryblokComponent
                  blok={blok.form.content}
                  courses={options}
                />
              )}
            </div>
          </div>
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
  base: 'sticky z-30 md:top-20 col-span-full md:col-span-4 sm:-mt-32 order-1 md:order-last max-h-fit',
})

const bannerClasses = tv({
  base: '-bottom-full',
  variants: {
    active: {
      true: 'fixed right-0 left-0 bottom-0 text-background bg-foreground transition-all',
      false:
        'flex flex-col align-start justify-start rounded-3xl bg-background text-foreground p-2 shadow-aside transition-all',
    },
  },
})

const containerClasses = tv({
  base: 'flex flex-col',
  variants: {
    active: {
      true: 'px-6 py-3 md:py-6 w-full mx-auto max-w-[1280px] sm:flex-row sm:justify-between gap-4 [&_button]:min-w-48',
      false: 'justify-between',
    },
  },
})
