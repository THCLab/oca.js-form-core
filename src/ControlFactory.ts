import { ControlData } from 'types/ControlData'
import { ControlBinary } from 'entities/controls/ControlBinary'
import { ControlCheckbox } from 'entities/controls/ControlCheckbox'
import { ControlDate } from 'entities/controls/ControlDate'
import { ControlNumeric } from 'entities/controls/ControlNumeric'
import { ControlSelect } from 'entities/controls/ControlSelect'
import { ControlSelectMultiple } from 'entities/controls/ControlSelectMultiple'
import { ControlText } from 'entities/controls/ControlText'
import { ControlReference } from 'entities/controls/ControlReference'
import { Config as OcaJsConfig } from 'OcaJs'
import { createStructure } from 'use_cases/createStructure'
import axios from 'axios'

export class ControlFactory {
  static async getControl(
    type: string,
    data: ControlData,
    config: OcaJsConfig
  ) {
    if (typeof data.entryCodes == 'string') {
      try {
        const result = await Promise.race(
          config.dataVaults.map(dataVaultUrl =>
            axios.get(`${dataVaultUrl}/api/v1/files/${data.entryCodes}`)
          )
        )
        if (result.data.errors) {
          throw result.data.errors
        }
        data.entryCodes = result.data
      } catch {
        data.entryCodes = []
      }
    }
    for (const translation of Object.values(data.translations)) {
      if (typeof translation.entries == 'string') {
        try {
          const result = await Promise.race(
            config.dataVaults.map(dataVaultUrl =>
              axios.get(`${dataVaultUrl}/api/v1/files/${translation.entries}`)
            )
          )
          if (result.data.errors) {
            throw result.data.errors
          }
          translation.entries = result.data
        } catch {
          translation.entries = {}
        }
      }
    }

    if (data.entryCodes) {
      if (data.multiple) {
        return new ControlSelectMultiple(data, type)
      }
      return new ControlSelect(data, type)
    }
    if (type === 'Text' || type === 'Array[Text]') {
      return new ControlText(data)
    } else if (type === 'Binary' || type === 'Array[Binary]') {
      return new ControlBinary(data)
    } else if (type === 'Numeric' || type === 'Array[Numeric]') {
      return new ControlNumeric(data)
    } else if (type === 'Boolean' || type === 'Array[Boolean]') {
      return new ControlCheckbox(data)
    } else if (type === 'DateTime' || type === 'Array[DateTime]') {
      return new ControlDate(data)
    } else if (
      type.startsWith('Reference:') ||
      type.startsWith('Array[Reference:')
    ) {
      if (data.sai && !data.reference) {
        try {
          const bundlesSAIs = (
            await Promise.race(
              config.ocaRepositories.map(ocaRepositoryUrl =>
                axios.get(
                  `${ocaRepositoryUrl}/api/v0.1/schemas/${data.sai}/bundles`
                )
              )
            )
          ).data

          const result = await Promise.race(
            config.ocaRepositories.map(ocaRepositoryUrl =>
              axios.get(
                `${ocaRepositoryUrl}/api/v0.1/schemas/${bundlesSAIs[0]}`
              )
            )
          )
          data.reference = await createStructure(result.data, config)
        } catch {
          data.reference = null
        }
      }
      return new ControlReference(data)
    }
  }
}
