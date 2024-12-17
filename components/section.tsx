import type { SectionProps } from '@props/types'

interface SectionComponent {
  blok: SectionProps
}

export function Section({ blok }: SectionComponent) {
  return (
    <section>
      {blok.headline && <div className=''>{blok.headline}</div>}
    </section>
  )
}
