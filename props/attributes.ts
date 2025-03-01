// TODO needs to maintain sheet synched https://docs.google.com/spreadsheets/d/194ZRHzQbaomR0efNm9tyCQGFEigk8tOg0MZOqjOY8i0

export type AreaAttribute = 'interni' | 'moda'
export const interesse_area = ['interni', 'moda']

export type SedeAttribute = 'padova' | 'treviso' | 'bassano'
export const interesse_sede = ['padova', 'treviso', 'bassano']

export type FrequenzaAttribute = 'serale' | 'sabato'
export const interesse_frequenza = ['serale', 'sabato']

export type InizioAttribute = 'marzo' | 'ottobre'
export const interesse_inizio = ['marzo', 'ottobre']

export type FatturaAttribute = ['privato', 'azienda']
export const pagamento_fattura = ['privato', 'azienda']

export type InterventoAttribute = ['arredare', 'rinnovare', 'ristrutturare']
export const progetto_intervento = ['arredare', 'rinnovare', 'ristrutturare']

export type RichiestaAttribute = 'studenti' | 'commerciale' | 'formazione'
export const collaborazione_richiesta = [
  'studenti',
  'commerciale',
  'formazione',
]
