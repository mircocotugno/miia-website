import { ProcessProps } from '@props/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import { tv } from 'tailwind-variants'

interface ProcessComponent {
  blok: ProcessProps
}

const processClasses = tv({
  base: 'relative flex flex-wrap items-baseline gap-2',
})

const stepClasses = tv({
  base: 'relative flex-none w-full sm:flex-1 sm:min-w-24 md:min-w-32 lg:min-w-48 group',
})

const indexClasses = tv({
  base: 'font-serif font-black text-5xl leading-snug',
})

const arrowClasses = tv({
  base: 'self-center justify-self-center rotate-90 sm:rotate-0 iconoir-arrow-right text-2xl',
})

export default function Process({ blok }: ProcessComponent) {
  return (
    <div className='col-span-12' {...storyblokEditable(blok)}>
      <h4 className='font-bold text-2xl'>{blok.title}</h4>
      <div className={processClasses()}>
        {blok.steps.map((step, index) => (
          <>
            {!!index && <i className={arrowClasses()} />}
            <div
              className={stepClasses()}
              {...storyblokEditable(step)}
              key={step._uid}
            >
              <h6 className={indexClasses()}>{index + 1}</h6>
              {step.contents.map((content) => (
                <StoryblokComponent blok={content} key={content._uid} />
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
