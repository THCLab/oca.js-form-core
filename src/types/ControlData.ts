import { ControlTranslation } from "./ControlTranslation"
import { Translations } from "./Translations"

export type ControlData = {
  name: string
  isPii: boolean
  characterEncoding: string,
  translations: Translations<ControlTranslation>
}
