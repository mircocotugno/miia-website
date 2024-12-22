export function getLongDate(date: Date) {
  if (date) {
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    })
  }
  return null
}

export function getShortDate(date: Date) {
  if (date) {
    return date.toLocaleDateString('it-IT', {
      month: 'long',
      year: 'numeric',
    })
  }
  return null
}