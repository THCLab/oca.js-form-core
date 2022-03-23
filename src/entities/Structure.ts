import { Section } from 'entities/Section'
import { Control } from 'types/Control'
import { Translations } from 'types/Translations'
import { StructureTranslation } from 'types/StructureTranslation'
import type { FormLayoutOverlay, CredentialLayoutOverlay } from 'oca.js'

export class Structure {
  sections: Section[]
  controls: Control[]
  translations: Translations<StructureTranslation>
  captureBaseSAI: string
  formLayout: FormLayoutOverlay['layout']
  credentialLayout: CredentialLayoutOverlay['layout']

  constructor(
    captureBaseSAI: string,
    translations: Translations<StructureTranslation> = {}
  ) {
    this.sections = []
    this.controls = []
    this.translations = translations
    this.captureBaseSAI = captureBaseSAI
    return this
  }

  addFormLayout(layout: FormLayoutOverlay['layout']) {
    this.formLayout = layout
    return this
  }

  addCredentialLayout(layout: CredentialLayoutOverlay['layout']) {
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
