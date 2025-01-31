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
  if (date) return ''
  return new Date(date).toLocaleDateString('it-IT', {
    month: 'long',
    year: 'numeric',
  })
}

