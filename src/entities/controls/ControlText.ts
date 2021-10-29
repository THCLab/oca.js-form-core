import { ControlBase } from './ControlBase'
import { ControlData } from '../../types/ControlData'

export class ControlText extends ControlBase {
  value: string

  constructor(data: ControlData) {
    super(data)
  }
}
