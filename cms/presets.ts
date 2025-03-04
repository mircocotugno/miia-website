import type { PresetSchema } from '../props/schema'

const nome: PresetSchema = {
  name: 'Nome',
  component_id: 'field',
  preset: {
    id: 'nome',
    input: 'text',
    label: 'Nome',
    required: true,
    placeholder: 'Mario',
  },
}

export const presets = {
  nome,
}
