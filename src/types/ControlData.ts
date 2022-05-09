import { Attribute } from 'types/Attribute'
import { Structure } from 'entities/Structure'

export type ControlData = {
  name: string
  isPii: boolean
  multiple: boolean
  reference?: Structure
} & Attribute
