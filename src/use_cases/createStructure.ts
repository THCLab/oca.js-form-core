import { Structure } from '@/entities/Structure'
import { Section } from '@/entities/Section'
import { ControlFactory } from '@/ControlFactory'
import { ControlData } from '@/types/ControlData'
import { Translations } from '@/types/Translations'
import { Attribute } from '@/types/Attribute'
import { AttributeTranslation } from '@/types/AttributeTranslation'
import { SectionTranslation } from '@/types/SectionTranslation'
import { StructureTranslation } from '@/types/StructureTranslation'
import { Config as OcaJsConfig } from '@/OcaJs'

import type {
  OCA,
  CharacterEncodingOverlay,
  MetaOverlay,
  FormatOverlay,
  UnitOverlay,
  EntryCodeOverlay,
  LabelOverlay,
  EntryOverlay,
  InformationOverlay,
  Overlay
} from 'oca.js'

export const createStructure = async (
  oca: OCA,
  config: OcaJsConfig
): Promise<Structure> => {
  const groupedOverlays = groupOverlays(oca.overlays)

  const structureFromMeta = getStructureFromMeta(groupedOverlays.meta)
  const structure = new Structure(structureFromMeta.translations)

  const sectionsFromLabel = getSectionsFromLabel(groupedOverlays.label)
  const attributes = collectAttributesFromOverlays(
    Object.keys(oca.capture_base.attributes),
    groupedOverlays
  )

  const generateSection = async (
    id: string,
    sectionFromLabel: SectionFromLabel
  ) => {
    const result = new Section(id, sectionFromLabel.translations)

    for (const attrName of sectionFromLabel.attrNames) {
      const attrType = oca.capture_base.attributes[attrName]
      const attribute = attributes[attrName]
      const data: ControlData = {
        name: attrName,
        isPii: oca.capture_base.pii.includes(attrName),
        ...attribute
      }
      result.addControl(await ControlFactory.getControl(attrType, data, config))
    }

    for (const [subId, sub] of Object.entries(sectionFromLabel.subsections)) {
      result.addSubsection(await generateSection(subId, sub))
    }

    return result
  }

  for (const [id, section] of Object.entries(sectionsFromLabel)) {
    structure.addSection(await generateSection(id, section))
  }

  return structure
}

type GroupedOverlays = {
  characterEncoding: CharacterEncodingOverlay[]
  entry: EntryOverlay[]
  entryCode: EntryCodeOverlay[]
  format: FormatOverlay[]
  information: InformationOverlay[]
  label: LabelOverlay[]
  meta: MetaOverlay[]
  unit: UnitOverlay[]
}

const groupOverlays = (overlays: Overlay[]): GroupedOverlays => {
  return {
    characterEncoding: overlays.filter(o =>
      o.type.includes(`/character_encoding/`)
    ) as CharacterEncodingOverlay[],
    entry: overlays.filter(o => o.type.includes(`/entry/`)) as EntryOverlay[],
    entryCode: overlays.filter(o =>
      o.type.includes(`/entry_code/`)
    ) as EntryCodeOverlay[],
    format: overlays.filter(o =>
      o.type.includes(`/format/`)
    ) as FormatOverlay[],
    information: overlays.filter(o =>
      o.type.includes(`/information/`)
    ) as InformationOverlay[],
    label: overlays.filter(o => o.type.includes(`/label/`)) as LabelOverlay[],
    meta: overlays.filter(o => o.type.includes(`/meta/`)) as MetaOverlay[],
    unit: overlays.filter(o => o.type.includes(`/unit/`)) as UnitOverlay[]
  }
}

const getStructureFromMeta = (metaOverlays: MetaOverlay[]) => {
  const result: {
    translations: Translations<StructureTranslation>
  } = { translations: {} }

  metaOverlays.forEach(o => {
    result.translations[o.language] = {
      name: o.name,
      description: o.description
    }
  })

  return result
}

type SectionsFromLabel = {
  [id: string]: SectionFromLabel
}
type SectionFromLabel = {
  translations: Translations<SectionTranslation>
  attrNames: string[]
  subsections: SectionsFromLabel
}
const getSectionsFromLabel = (labelOverlays: LabelOverlay[]) => {
  const result: SectionsFromLabel = {}

  labelOverlays.forEach(o => {
    o.attr_categories.forEach(
      (cat: string) =>
        (result[cat] ||= { translations: {}, attrNames: [], subsections: {} })
    )
    Object.entries(o.cat_attributes).forEach(
      ([cat, attrNames]: [string, string[]]) => {
        const attrs = result[cat].attrNames
        if (attrs.length === 0) {
          attrs.push(...attrNames)
        }
      }
    )

    Object.entries(o.cat_labels).forEach(
      ([cat, label]: [string, string]) =>
        (result[cat].translations[o.language] = { label })
    )
  })

  const catKeys = Object.keys(result)
  Object.entries(result).forEach(([cat, section]) => {
    const catNumbers = cat.replace('_cat-', '').replace('_', '').split('-')
    const regex = new RegExp(`^_cat-${catNumbers.join('-')}(-[0-9]*){1}_$`)
    catKeys
      .filter(c => regex.test(c))
      .forEach(subCat => {
        section.subsections[subCat] = result[subCat]
        delete result[subCat]
      })
  })

  return result
}

const collectAttributesFromOverlays = (
  attributeNames: string[],
  groupedOverlays: GroupedOverlays
) => {
  const result: { [attr_name: string]: Attribute } = {}

  attributeNames.forEach(attrName => {
    result[attrName] = { translations: {} }
  })

  if (groupedOverlays.characterEncoding.length > 0) {
    const fromCharacterEncoding = getAttributesFromCharacterEncoding(
      groupedOverlays.characterEncoding[0]
    )
    Object.keys(result).forEach(attrName => {
      result[attrName].characterEncoding =
        fromCharacterEncoding.attributes[attrName] ||
        fromCharacterEncoding.default
    })
  }

  if (groupedOverlays.format.length > 0) {
    const fromFormat = getAttributesFromFormat(groupedOverlays.format[0])
    Object.entries(fromFormat).forEach(([attrName, format]) => {
      result[attrName].format = format
    })
  }

  if (groupedOverlays.unit.length > 0) {
    const fromUnit = getAttributesFromUnit(groupedOverlays.unit[0])
    Object.entries(fromUnit).forEach(([attrName, unit]) => {
      result[attrName].unit = unit
    })
  }

  if (groupedOverlays.entryCode.length > 0) {
    const fromEntryCode = getAttributesFromEntryCode(
      groupedOverlays.entryCode[0]
    )
    Object.entries(fromEntryCode).forEach(([attrName, entryCodes]) => {
      result[attrName].entryCodes = entryCodes
    })
  }

  const fromLabel = getAttributesFromLabel(groupedOverlays.label)
  Object.entries(fromLabel).forEach(([attrName, { translations }]) => {
    result[attrName] ??= { translations: {} }
    Object.entries(translations).forEach(([lang, translation]) => {
      result[attrName].translations[lang] ??= {}
      result[attrName].translations[lang].label = translation.label
    })
  })

  const fromInformation = getAttributesFromInformation(
    groupedOverlays.information
  )
  Object.entries(fromInformation).forEach(([attrName, { translations }]) => {
    result[attrName] ??= { translations: {} }
    Object.entries(translations).forEach(([lang, translation]) => {
      result[attrName].translations[lang] ??= {}
      result[attrName].translations[lang].information = translation.information
    })
  })

  const fromEntry = getAttributesFromEntry(groupedOverlays.entry)
  Object.entries(fromEntry).forEach(([attrName, { translations }]) => {
    result[attrName] ??= { translations: {} }
    Object.entries(translations).forEach(([lang, translation]) => {
      result[attrName].translations[lang] ??= {}
      result[attrName].translations[lang].entries = translation.entries
    })
  })

  return result
}

const getAttributesFromLabel = (labelOverlays: LabelOverlay[]) => {
  const result: {
    [attrName: string]: {
      translations: Translations<AttributeTranslation>
    }
  } = {}

  labelOverlays.forEach(o => {
    Object.entries(o.attr_labels).forEach(([attrName, label]) => {
      result[attrName] ??= { translations: {} }
      result[attrName].translations[o.language] ||= { label }
    })
  })
  return result
}

const getAttributesFromInformation = (
  informationOverlays: InformationOverlay[]
) => {
  const result: {
    [attrName: string]: {
      translations: Translations<AttributeTranslation>
    }
  } = {}

  informationOverlays.forEach(o => {
    Object.entries(o.attr_information).forEach(([attrName, information]) => {
      result[attrName] ??= { translations: {} }
      result[attrName].translations[o.language] ||= { information }
    })
  })
  return result
}

const getAttributesFromEntry = (entryOverlays: EntryOverlay[]) => {
  const result: {
    [attrName: string]: {
      translations: Translations<AttributeTranslation>
    }
  } = {}

  entryOverlays.forEach(o => {
    Object.entries(o.attr_entries).forEach(([attrName, entries]) => {
      result[attrName] ??= { translations: {} }
      result[attrName].translations[o.language] ||= { entries }
    })
  })
  return result
}

const getAttributesFromCharacterEncoding = (
  encodingOverlay: CharacterEncodingOverlay
) => {
  const result: {
    default: string
    attributes: { [attrName: string]: string }
  } = {
    default: encodingOverlay.default_character_encoding,
    attributes: {}
  }

  Object.entries(encodingOverlay.attr_character_encoding).forEach(
    ([attrName, encoding]) => {
      result.attributes[attrName] = encoding
    }
  )
  return result
}

const getAttributesFromFormat = (formatOverlay: FormatOverlay) => {
  const result: { [attrName: string]: string } = {}

  Object.entries(formatOverlay.attr_formats).forEach(([attrName, format]) => {
    result[attrName] = format
  })
  return result
}

const getAttributesFromUnit = (unitOverlay: UnitOverlay) => {
  const result: { [attrName: string]: string } = {}

  Object.entries(unitOverlay.attr_units).forEach(([attrName, unit]) => {
    result[attrName] = unit
  })
  return result
}

const getAttributesFromEntryCode = (entryCodeOverlay: EntryCodeOverlay) => {
  const result: { [attrName: string]: string[] } = {}

  Object.entries(entryCodeOverlay.attr_entry_codes).forEach(
    ([attrName, entryCodes]) => {
      result[attrName] = entryCodes
    }
  )
  return result
}
