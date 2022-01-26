import { Section } from '@/entities/Section'
import { Control } from '@/types/Control'
import { Translations } from '@/types/Translations'
import { StructureTranslation } from '@/types/StructureTranslation'

export class Structure {
  sections: Section[]
  controls: Control[]
  translations: Translations<StructureTranslation>

  constructor(translations: Translations<StructureTranslation> = {}) {
    this.sections = []
    this.controls = []
    this.translations = translations
    return this
  }

  addSection(section: Section) {
    this.sections.push(section)
    return this
  }

  addControl(control: Control) {
    this.controls.push(control)
    return this
  }
}
