import { ControlBase } from 'entities/controls/ControlBase'
import { ControlData } from 'types/ControlData'

export class ControlSelectMultiple extends ControlBase {
  value: string[]
  attributeType: string

  constructor(data: ControlData, attributeType: string) {
    super({ ...data, type: 'SelectMultiple' })
    this.attributeType = attributeType
  }
}
