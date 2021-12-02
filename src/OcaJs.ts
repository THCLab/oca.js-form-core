import { createStructure } from '@/use_cases/createStructure'
import { Structure } from '@/entities/Structure'
import type { OCA } from 'oca.js'

export type Config = {
  dataVaults?: string[]
}

export class OcaJs {
  config: Config

  constructor(config: Config) {
    this.config = config
  }

  async createStructure(oca: OCA): Promise<Structure> {
    return await createStructure(oca, this.config)
  }

  updateDataVaults(dataVaults: Config['dataVaults']) {
    this.config.dataVaults = dataVaults
  }
}
