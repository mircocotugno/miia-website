import type { ReactElement } from 'react'

interface ColumnComponent {
  parent?: string
  children: ReactElement
  classes: string
}
export function Column({ parent, children, classes }: ColumnComponent) {
  if (!parent) return children
  const parents: Array<string> = ['section', 'footer']
  return parents.includes(parent) ? (
    <div className={classes}>{children}</div>
  ) : (
    children
  )
}
