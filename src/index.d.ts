declare module 'oca.js-form-core' {
  import init from 'oca.js'
  import type { OCA } from 'oca.js'
  import { ControlType } from '@/types/ControlType'

  export type Structure = {
    sections: Section[]
    controls: Control[]
    translations: Translations<StructureTranslation>
    formLayout: string
    credentialLayout: string
  }

  type Section = {
    id: string
    translations: Translations<SectionTranslation>
  }

  type Control =
    | ControlBinary
    | ControlCheckbox
    | ControlDate
    | ControlNumber
    | ControlSelect
    | ControlSelectMultiple
    | ControlText
    | ControlReference

  type ControlBase = {
    name: string
    isPii: boolean
    characterEncoding: string
    entryCodes: string[]
    format: string
    unit: string
    sai: string
    reference: Structure
    translations: Translations<AttributeTranslation>
    type: ControlType
  }

  type ControlType =
    | 'Binary'
    | 'Checkbox'
    | 'Date'
    | 'Number'
    | 'Select'
    | 'SelectMultiple'
    | 'Text'
    | 'Reference'

  type ControlBinary = ControlBase & {
    value: string
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
  type ControlReference = ControlBase

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
  const resolveFromZip: (file: File) => Promise<OCA>

  type Config = {
    dataVaults?: string[]
    ocaRepositories?: string[]
  }

  export class OcaJs {
    config: Config

    constructor(config: Config)
    createStructure: (oca: OCA) => Promise<Structure>
    updateOcaRepositories: (ocaRepositories: Config['ocaRepositories']) => void
    updateDataVaults: (dataVaults: Config['dataVaults']) => void
  }
  export { createOCA, createStructure, resolveFromZip }
  export default init
}
