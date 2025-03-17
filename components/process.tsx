import { ProcessProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { Fragment } from 'react'
import { tv } from 'tailwind-variants'

interface ProcessComponent {
  blok: ProcessProps
}

const processClasses = tv({
  base: 'flex flex-col md:flex-row flex-wrap gap-2 items-center sm:items-start md:items-center',
})

const stepClasses = tv({
  base: 'flex flex-col sm:flex-row md:flex-col gap-4 flex-1 items-center md:items-start',
})

const indexClasses = tv({
  base: 'font-serif font-black text-5xl leading-snug',
})

const arrowClasses = tv({
  base: 'rotate-90 md:rotate-0 iconoir-arrow-right text-2xl lg:px-4',
})

export default function Process({ blok }: ProcessComponent) {
  return (
    <div className='col-span-12' {...storyblokEditable(blok)}>
      {blok.title && <h4 className='font-bold text-2xl'>{blok.title}</h4>}
      <div className={processClasses()}>
        {blok.steps.map((step, index) => (
          <Fragment key={step._uid}>
            {!!index && <i className={arrowClasses()} />}
            <div className={stepClasses()} {...storyblokEditable(step)}>
              <h6 className={indexClasses()}>{index + 1}</h6>
              {step.contents.map((content) => (
                <StoryblokComponent blok={content} key={content._uid} />
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
