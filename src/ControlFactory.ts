import { ControlData } from '@/types/ControlData'
import { ControlCheckbox } from '@/entities/controls/ControlCheckbox'
import { ControlDate } from '@/entities/controls/ControlDate'
import { ControlNumber } from '@/entities/controls/ControlNumber'
import { ControlSelect } from '@/entities/controls/ControlSelect'
import { ControlSelectMultiple } from '@/entities/controls/ControlSelectMultiple'
import { ControlText } from '@/entities/controls/ControlText'

export class ControlFactory {
  static getControl(type: string, data: ControlData) {
    if (type === 'Text') {
      if (data.entryCodes) {
        return new ControlSelect(data)
      } else {
        return new ControlText(data)
      }
    } else if (type === 'Number') {
      return new ControlNumber(data)
    } else if (type === 'Boolean') {
      return new ControlCheckbox(data)
    } else if (type === 'Date') {
      return new ControlDate(data)
    } else if (type === 'Array[Text]') {
      return new ControlSelectMultiple(data)
    }
  }
}
