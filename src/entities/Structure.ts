import { Section } from '@/entities/Section'
import { Translations } from '@/types/Translations'
import { StructureTranslation } from '@/types/StructureTranslation'

export class Structure {
  sections: Section[]
  translations: Translations<StructureTranslation>

  constructor(translations: Translations<StructureTranslation> = {}) {
    this.sections = []
    this.translations = translations
    return this
  }

  addSection(section: Section) {
    this.sections.push(section)
    return this
  }
}
