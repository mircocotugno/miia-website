import type { ReactNode } from 'react'

interface ContainerComponent {
  children: ReactNode
  wrap: boolean
  classes: string
}

export function Container({ children, wrap, classes }: ContainerComponent) {
  return wrap ? <div className={classes}>{children}</div> : children
}
