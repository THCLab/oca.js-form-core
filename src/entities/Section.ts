import { Control } from '../types/Control'
import { Translations } from '../types/Translations'
import { SectionTranslation } from '../types/SectionTranslation'

export class Section {
  id: string
  controls: Control[]
  translations: Translations<SectionTranslation>

  constructor(id: string, translations: Translations<SectionTranslation>) {
    this.id = id
    this.translations = translations
    this.controls = []
    return this
  }

  addControl(control: Control) {
    this.controls.push(control)
    return this
  }
}
