import { AttributeTranslation } from 'types/AttributeTranslation'
import { Translations } from 'types/Translations'

export type Attribute = {
  characterEncoding?: string
  entryCodes?: string[]
  entryCodesMapping?: string[]
  format?: string
  metric_system?: string
  unit?: string
  sai?: string
  condition?: string
  dependencies?: string[]
  mapping?: string
  cardinality?: string
  conformance?: 'O' | 'M'
  translations: Translations<AttributeTranslation>
}
