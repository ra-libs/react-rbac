export * from './CASL'

export type Permission = {
    action: string;
    subject: string;
    conditions?: JSON
    inverted?: boolean
}

export type Role = {
    name: string;
    permissions: Permission[]
}