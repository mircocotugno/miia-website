export function getLongDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('it-IT', {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })
}

export function getShortDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('it-IT', {
    month: 'long',
    year: 'numeric',
  })
}

export interface ImageSize {
  width: number
  height: number
  ratio: number
  axis: 'width' | 'height'
}

export function getImageSizes(image: any) {
  const match = image.filename.match(/\/(\d+)x(\d+)\//)

  const [width, height] = match?.slice(1).map(Number) || [1024, 768]
  const ratio = width / height

  return {
    ...image,
    size: {
      width,
      height,
      ratio,
      axis: ratio >= 1 ? 'width' : 'height',
    },
  }
}