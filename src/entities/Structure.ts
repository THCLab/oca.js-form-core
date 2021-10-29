import { Section } from './Section'

export class Structure {
  sections: Section[]

  constructor() {
    this.sections = []
    return this
  }

  addSection(section: Section) {
    this.sections.push(section)
    return this
  }
}
