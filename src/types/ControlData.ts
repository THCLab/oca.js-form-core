import { Attribute } from 'types/Attribute'
import { Structure } from 'entities/Structure'

export type ControlData = {
  name: string
  isFlagged: boolean
  multiple: boolean
  reference?: Structure
} & Attribute
