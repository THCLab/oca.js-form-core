import { Structure } from '../entities/Structure'
import { Section } from '../entities/Section'
import { ControlFactory } from '../ControlFactory'
import { ControlData } from '../types/ControlData'
import { Translations } from '../types/Translations'
import { ControlTranslation } from '../types/ControlTranslation'
import { SectionTranslation } from '../types/SectionTranslation'

export const createStructure = (oca: any): Structure => {
  const structure = new Structure()

  const sectionsFromLabel = getSectionsFromLabel(
    filterOverlaysByType(oca.overlays, 'label')
  )
  const attributesFromLabel = getAttributesFromLabel(
    filterOverlaysByType(oca.overlays, 'label')
  )
  const attributesFromCharacterEncoding = getAttributesFromCharacterEncoding(
    filterOverlaysByType(oca.overlays, 'character_encoding')[0]
  )

  Object.entries(sectionsFromLabel).forEach(
    ([id, { translations, attributes }]) => {
      const section = new Section(id, translations)
      attributes.forEach((attr_name: string) => {
        const data: ControlData = {
          name: attr_name,
          isPii: oca.capture_base.pii.includes(attr_name),
          characterEncoding:
            attributesFromCharacterEncoding.attributes[attr_name] ||
            attributesFromCharacterEncoding.default,
          translations: {
            ...attributesFromLabel[attr_name].translations
          }
        }
        const attr_type = oca.capture_base.attributes[attr_name]
        section.addControl(ControlFactory.getControl(attr_type, data))
      })

      structure.addSection(section)
    }
  )
  return structure
}

const filterOverlaysByType = (overlays: any[], type: string) => {
  return overlays.filter((o) => o.type.includes(`/${type}/`))
}

const getSectionsFromLabel = (labelOverlays: any[]) => {
  const result: {
    [id: string]: {
      translations: Translations<SectionTranslation>
      attributes: string[]
    }
  } = {}

  labelOverlays.forEach((o) => {
    o.attr_categories.forEach(
      (cat: string) => (result[cat] ||= { translations: {}, attributes: [] })
    )
    Object.entries(o.cat_attributes).forEach(
      ([cat, attributes]: [string, string[]]) => {
        const attrs = result[cat].attributes
        if (attrs.length === 0) {
          attrs.push(...attributes)
        }
      }
    )

    Object.entries(o.cat_labels).forEach(
      ([cat, label]: [string, string]) =>
        (result[cat].translations[o.language] = { label })
    )
  })
  return result
}

const getAttributesFromLabel = (labelOverlays: any[]) => {
  const result: {
    [attr_name: string]: {
      translations: Translations<ControlTranslation>
    }
  } = {}

  labelOverlays.forEach((o) => {
    Object.entries(o.attr_labels).forEach(
      ([attr_name, label]: [string, string]) => {
        result[attr_name] ??= { translations: {} }
        result[attr_name].translations[o.language] ||= { label }
      }
    )
  })
  return result
}

const getAttributesFromCharacterEncoding = (encodingOverlay: any) => {
  const result: {
    default: string
    attributes: { [attr_name: string]: string }
  } = {
    default: encodingOverlay.default_character_encoding,
    attributes: {}
  }

  Object.entries(encodingOverlay.attr_character_encoding).forEach(
    ([attr_name, encoding]: [string, string]) => {
      result.attributes[attr_name] = encoding
    }
  )
  return result
}
