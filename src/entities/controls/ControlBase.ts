import { ControlData } from 'types/ControlData'
import { AttributeTranslation } from 'types/AttributeTranslation'
import { Translations } from 'types/Translations'
import { ControlType } from 'types/ControlType'
import { Structure } from 'entities/Structure'

export class ControlBase {
  name: string
  isPii: boolean
  multiple: boolean
  characterEncoding: string
  entryCodes: string[]
  entryCodesMapping: string[]
  format: string
  metric_system: string
  unit: string
  sai: string
  condition: string
  dependencies: string[]
  mapping: string
  cardinality: string
  conformance: 'O' | 'M'
  reference: Structure
  translations: Translations<AttributeTranslation>
  type: ControlType

  constructor(data: ControlData & { type: ControlType }) {
    this.name = data.name
    this.isPii = data.isPii
    this.multiple = data.multiple
    this.characterEncoding = data.characterEncoding
    this.entryCodes = data.entryCodes
    this.entryCodesMapping = data.entryCodesMapping
    this.format = data.format
    this.metric_system = data.metric_system
    this.unit = data.unit
    this.sai = data.sai
    this.condition = data.condition
    this.dependencies = data.dependencies
    this.mapping = data.mapping
    this.cardinality = data.cardinality
    this.conformance = data.conformance
    this.reference = data.reference
    this.translations = data.translations
    this.type = data.type
  }
}
