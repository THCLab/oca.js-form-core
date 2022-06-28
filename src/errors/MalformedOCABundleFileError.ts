export class MalformedOCABundleFileError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Malformed OCA Bundle File'
  }
}
