import { ControlBase } from 'entities/controls/ControlBase'
import { ControlData } from 'types/ControlData'

export class ControlNumeric extends ControlBase {
  value: number

  constructor(data: ControlData) {
    super({ ...data, type: 'Numeric' })
  }
}
