import { Encoding, OCA, Attribute, AttributeType } from 'oca.js'

export const createOCA = (): OCA => {
  return new OCA(Encoding.Utf8)
    .addAttribute(
      new Attribute('first_name', AttributeType.Text)
        .setPii()
        .addLabel({
          en_EN: 'First Name',
          pl_PL: 'Imię'
        })
        .build()
    )
    .addAttribute(
      new Attribute('last_name', AttributeType.Number)
        .addLabel({
          en_EN: 'Last Name',
          pl_PL: 'Nazwisko'
        })
        .addEncoding(Encoding.Iso8859_1)
        .build()
    )
    .finalize()
}
