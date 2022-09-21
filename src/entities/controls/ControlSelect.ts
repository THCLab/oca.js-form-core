import { ControlBase } from 'entities/controls/ControlBase'
import { ControlData } from 'types/ControlData'

export class ControlSelect extends ControlBase {
  value: string
  attributeType: string

  constructor(data: ControlData, attributeType: string) {
    super({ ...data, type: 'Select' })
    this.attributeType = attributeType
  }
}
