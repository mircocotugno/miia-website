import type { CourseProps } from '@props/types'
import { Card, CardHeader, CardBody } from '@nextui-org/react'

interface CourseComponent {
  blok: CourseProps
}

export function Course({ blok }: CourseComponent) {
  return (
    <Card>
      <CardHeader>
        <h4>{blok.program}</h4>
        <p>{blok.location.city}</p>
      </CardHeader>
      <CardBody>
        
      </CardBody>
    </Card>
  )
}