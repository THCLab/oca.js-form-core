import { AttributeTranslation } from '@/types/AttributeTranslation'
import { Translations } from '@/types/Translations'

export type Attribute = {
  characterEncoding?: string
  entryCodes?: string[]
  format?: string
  unit?: string
  translations: Translations<AttributeTranslation>
}
