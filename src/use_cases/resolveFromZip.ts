import JSZip from 'jszip'
import type { OCA } from 'oca.js'

export const resolveFromZip = async (file: File): Promise<OCA> => {
  const openedZip = await new JSZip().loadAsync(file)
  const schemaName = Object.values(openedZip.files)
    .find(f => f.dir)
    .name.replace('/', '')

  const promises: {
    capture_base: Promise<string>
    overlays: Promise<string>[]
  } = {
    capture_base: openedZip.file(`${schemaName}.json`).async('string'),
    overlays: []
  }

  const overlayFiles = Object.values(openedZip.files).filter(
    f => !f.dir && f.name.match(`${schemaName}/`)
  )

  overlayFiles.forEach(overlayFile => {
    promises.overlays.push(overlayFile.async('string'))
  })

  const result: OCA = {
    capture_base: JSON.parse(await promises.capture_base),
    overlays: (await Promise.all(promises.overlays)).map(s => JSON.parse(s))
  }

  return new Promise(r => r(result))
}
