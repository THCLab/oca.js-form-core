import { Control } from '@/types/Control'
import { Translations } from '@/types/Translations'
import { SectionTranslation } from '@/types/SectionTranslation'

export class Section {
  id: string
  controls: Control[]
  translations: Translations<SectionTranslation>
  subsections: Section[]

  constructor(id: string, translations: Translations<SectionTranslation>) {
    this.id = id
    this.translations = translations
    this.controls = []
    this.subsections = []
    return this
  }

  addControl(control: Control) {
    this.controls.push(control)
    return this
  }

  addSubsection(section: Section) {
    this.subsections.push(section)
    return this
  }
}
