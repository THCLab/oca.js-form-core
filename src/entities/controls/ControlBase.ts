import { ControlData } from '../../types/ControlData'
import { ControlTranslation } from '../../types/ControlTranslation'
import { Translations } from '../../types/Translations'

export class ControlBase {
  name: string
  isPii: boolean
  characterEncoding: string
  translations: Translations<ControlTranslation>

  constructor(data: ControlData) {
    this.name = data.name
    this.isPii = data.isPii
    this.characterEncoding = data.characterEncoding
    this.translations = data.translations
  }
}
