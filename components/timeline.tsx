import { tv } from 'tailwind-variants'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

interface TimelineComponent {
  blok: any
}

// export default function Timeline({ blok }: TimelineComponent) {
//   const timelineClasses = tv({
//     base: 'relative flex flex-col items-center justify-center -space-y-4 sm:-space-y-8',
//   })

//   const stepClasses = tv({
//     base: 'relative w-full sm:w-1/2 border-2 border-transparent border-l-neutral-500',
//     variants: {
//       justify: {
//         left: 'pr-4 sm:self-start sm:translate-x-px sm:border-r-neutral-500 sm:border-l-transparent',
//         right:
//           'pl-4 sm:self-end sm:-translate-x-px sm:border-l-neutral-500 sm:border-r-none',
//       },
//     },
//   })

//   const dotClasses = tv({
//     base: 'w-3 h-3 absolute top-1/2 rounded-full bg-neutral-500 border-2 border-background z-10 -left-px -translate-x-1/2 ',
//     variants: {
//       justify: {
//         left: 'sm:left-auto sm:-right-px sm:translate-x-1/2',
//         right: '',
//       },
//     },
//   })
//   return (
//     <>
//       <h4 className='font-bold text-2xl'>{blok.label}</h4>
//       <div className={timelineClasses()} {...storyblokEditable(blok)}>
//         {blok.items.map((item, index) => {
//           const justify = index % 2 ? 'right' : 'left'
//           return (
//             <div
//               className={stepClasses({ justify: justify })}
//               {...storyblokEditable(item)}
//               key={`step-${index}`}
//             >
//               <div className={dotClasses({ justify: justify })} />
//               {item.contents.map((content, index) => (
//                 <StoryblokComponent blok={content} key={`content-${index}`} />
//               ))}
//             </div>
//           )
//         })}
//       </div>
//     </>
//   )
// }
