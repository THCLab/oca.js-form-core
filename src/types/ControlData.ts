import { ControlTranslation } from '@/types/ControlTranslation'
import { Translations } from '@/types/Translations'

export type ControlData = {
  name: string
  isPii: boolean
  characterEncoding: string
  translations: Translations<ControlTranslation>
}
