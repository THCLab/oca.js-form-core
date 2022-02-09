import { Section } from 'entities/Section'
import { Control } from 'types/Control'
import { Translations } from 'types/Translations'
import { StructureTranslation } from 'types/StructureTranslation'

export class Structure {
  sections: Section[]
  controls: Control[]
  translations: Translations<StructureTranslation>
  formLayout: string
  credentialLayout: string

  constructor(translations: Translations<StructureTranslation> = {}) {
    this.sections = []
    this.controls = []
    this.translations = translations
    return this
  }

  addFormLayout(layout: string) {
    this.formLayout = layout
    return this
  }

  addCredentialLayout(layout: string) {
    this.credentialLayout = layout
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
