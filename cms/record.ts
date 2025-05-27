import path from 'path'
import fs from 'fs'

const file = path.join('cms', 'ids.txt')

interface GetRecord {
  name: string
  type: string
  unique?: boolean
}

export function getRecord({ name, type, unique = false }: GetRecord) {
  const key: string = `${name}_${type}_${unique ? 'uuid' : 'id'}`
  const records: Array<string> = fs.readFileSync(file, 'utf-8').split('\n')
  const record: Array<string> = records.filter((e) => e.includes(key))

  return record[0] ? record[0].split('=')[1] : null
}

interface PrintRecord {
  name: string
  type: string
  id: string
  uuid?: string
}

export async function printRecord({ name, type, id, uuid }: PrintRecord) {
  const key: string = `${name}_${type}`
  const records: Array<string> = fs
    .readFileSync(file, 'utf-8')
    .split('\n')
    .filter((e: string) => !!e)
  records.push(`${key}_id=${id}`)
  if (uuid) {
    records.push(`${key}_uuid=${uuid}`)
  }

  await fs.writeFileSync(file, records.join('\n'))
}

interface CancelRecord {
  name: string
  type: string
}

export async function cancelRecords({ name, type }: CancelRecord) {
  const key: string = `${name}_${type}`
  const records: Array<string> = fs
    .readFileSync(file, 'utf-8')
    .split('\n')
    .filter((e: string) => !!e)
  const values = ['id', 'uuid']
  values.forEach((value: string) => {
    const index: number = records.findIndex((e: string) =>
      e.includes(`${key}_${value}`)
    )

    if (index >= 0) {
      records.splice(index, 1)
    }
  })

  await fs.writeFileSync(file, records.join('\n'))
}
