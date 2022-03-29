import { AttributeTranslation } from 'types/AttributeTranslation'
import { Translations } from 'types/Translations'

export type Attribute = {
  characterEncoding?: string
  entryCodes?: string[]
  format?: string
  unit?: string
  sai?: string
  condition?: string
  dependencies?: string[]
  translations: Translations<AttributeTranslation>
}
