export * from './CASL'

export type Permission = {
  action: string
  subject: string
  conditions?: JSON
  inverted?: boolean
  fields?: string[]
}

export type Role = {
  name: string
  permissions: Permission[]
}
