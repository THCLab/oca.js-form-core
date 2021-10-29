import { ControlBase } from './ControlBase'
import { ControlData } from '../../types/ControlData'

export class ControlNumber extends ControlBase {
  value: number

  constructor(data: ControlData) {
    super(data)
  }
}
