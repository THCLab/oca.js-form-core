declare module 'oca.js-form-core' {
  import init from 'oca.js'
  import type { OCA } from 'oca.js'

  export type Structure = {
    sections: Section[]
    translations: Translations<StructureTranslation>
  }

  type Section = {
    id: string
    controls: Control[]
    translations: Translations<SectionTranslation>
  }

  type Control =
    | ControlCheckbox
    | ControlDate
    | ControlNumber
    | ControlSelect
    | ControlSelectMultiple
    | ControlText

  type ControlBase = {
    name: string
    isPii: boolean
    characterEncoding: string
    entryCodes: string[]
    format: string
    unit: string
    translations: Translations<AttributeTranslation>
  }

  type ControlCheckbox = ControlBase & {
    value: boolean
  }
  type ControlDate = ControlBase & {
    value: string
  }
  type ControlNumber = ControlBase & {
    value: number
  }
  type ControlSelect = ControlBase & {
    value: string
  }
  type ControlSelectMultiple = ControlBase & {
    value: string[]
  }
  type ControlText = ControlBase & {
    value: string
  }

  type Translations<T> = {
    [lang: string]: T
  }

  type AttributeTranslation = {
    entries?: { [code: string]: string }
    information?: string
    label?: string
  }

  type SectionTranslation = {
    label: string
  }

  type StructureTranslation = {
    name?: string
    description?: string
  }

  const createOCA: () => OCA
  const createStructure: (oca: OCA) => Structure

  export { createOCA, createStructure }
  export default init
}
