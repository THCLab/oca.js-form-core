import { ControlData } from "./types/ControlData"
import { ControlText } from "./entities/controls/ControlText"
import { ControlNumber } from "./entities/controls/ControlNumber"

export class ControlFactory {
  static getControl(type: string, data: ControlData) {
    if (type === "Text") {
      return new ControlText(data)
    } else if (type === "Number") {
      return new ControlNumber(data)
    }
  }
}
