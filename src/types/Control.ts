import { ControlBinary } from 'entities/controls/ControlBinary'
import { ControlCheckbox } from 'entities/controls/ControlCheckbox'
import { ControlDate } from 'entities/controls/ControlDate'
import { ControlNumeric } from 'entities/controls/ControlNumeric'
import { ControlSelect } from 'entities/controls/ControlSelect'
import { ControlSelectMultiple } from 'entities/controls/ControlSelectMultiple'
import { ControlText } from 'entities/controls/ControlText'
import { ControlReference } from 'entities/controls/ControlReference'

export type Control =
  | ControlBinary
  | ControlCheckbox
  | ControlDate
  | ControlNumeric
  | ControlSelect
  | ControlSelectMultiple
  | ControlText
  | ControlReference
