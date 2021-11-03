import { ControlData } from '@/types/ControlData'
import { AttributeTranslation } from '@/types/AttributeTranslation'
import { Translations } from '@/types/Translations'

export class ControlBase {
  name: string
  isPii: boolean
  characterEncoding: string
  entryCodes: string[]
  format: string
  unit: string
  translations: Translations<AttributeTranslation>

  constructor(data: ControlData) {
    this.name = data.name
    this.isPii = data.isPii
    this.characterEncoding = data.characterEncoding
    this.entryCodes = data.entryCodes
    this.format = data.format
    this.unit = data.unit
    this.translations = data.translations
  }
}
