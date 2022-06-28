import JSZip from 'jszip'
import type { OCA } from 'oca.js'
import type { Dictionary } from 'types'
import { MalformedOCABundleFileError } from 'errors'

export const resolveFromZip = async (file: File): Promise<OCA> => {
  const openedZip = await new JSZip().loadAsync(file)

  const promises: Record<string, Promise<string>> = Object.values(
    openedZip.files
  )
    .filter(f => !f.dir)
    .reduce((result: Record<string, Promise<string>>, file) => {
      result[file.name.split('.')[0]] = file.async('string')
      return result
    }, {})

  const files = Object.entries(await promiseObjectAll(promises)).reduce(
    (result: Dictionary, [name, content]) => {
      if (!name.includes('/')) {
        result[name] = JSON.parse(content)
      }
      return result
    },
    {}
  )
  validateExtractedFiles(files)

  const rootCaptureBaseSAI: string = files.meta.root
  const referenceCaputerBaseSAIs = Object.entries(files.meta.files)
    .filter(([key, _]) => {
      return key.startsWith('capture_base')
    })
    .map(([_, v]: [string, string]) => v)

  const references = referenceCaputerBaseSAIs.reduce(
    (result: OCA['references'], sai: string) => {
      result[sai] = fetchOCA(files, sai)
      return result
    },
    {}
  )

  const result = references[rootCaptureBaseSAI]
  delete references[rootCaptureBaseSAI]

  if (Object.keys(references).length > 0) {
    result['references'] = references
  }

  return new Promise(r => r(result))
}

const fetchOCA = (files: Dictionary, captureBaseSAI: string): OCA => {
  return {
    capture_base: files[captureBaseSAI],
    overlays: Object.values(files).filter(
      object => object?.capture_base === captureBaseSAI
    )
  }
}

const delayName = ([name, promise]: [string, Promise<string>]) =>
  promise.then(result => [name, result])

type PromiseValues<TO> = {
  [TK in keyof TO]: Promise<TO[TK]>
}

const promiseObjectAll = async <T>(object: PromiseValues<T>): Promise<T> => {
  const promiseList = Object.entries(object).map(delayName)
  return Promise.all(promiseList).then(Object.fromEntries)
}

const validateExtractedFiles = (files: Dictionary) => {
  if (!files.meta) {
    throw new MalformedOCABundleFileError(`missing 'meta.json' file`)
  }

  if (!files.meta.root) {
    throw new MalformedOCABundleFileError(
      `'meta.json' must contain root property`
    )
  }

  if (!files[files.meta.root]) {
    throw new MalformedOCABundleFileError(`missing root Capture Base file`)
  }
}
