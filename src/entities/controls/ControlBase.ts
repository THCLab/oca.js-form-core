import { ControlData } from '@/types/ControlData'
import { AttributeTranslation } from '@/types/AttributeTranslation'
import { Translations } from '@/types/Translations'
import { ControlType } from '@/types/ControlType'

export class ControlBase {
  name: string
  isPii: boolean
  characterEncoding: string
  entryCodes: string[]
  format: string
  unit: string
  translations: Translations<AttributeTranslation>
  type: ControlType

  constructor(data: ControlData & { type: ControlType }) {
    this.name = data.name
    this.isPii = data.isPii
    this.characterEncoding = data.characterEncoding
    this.entryCodes = data.entryCodes
    this.format = data.format
    this.unit = data.unit
    this.translations = data.translations
    this.type = data.type
  }
}
