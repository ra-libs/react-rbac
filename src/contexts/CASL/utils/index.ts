import { Ability, RawRule, SubjectRawRule } from '@casl/ability'
import { isSingular, plural } from 'pluralize'

import { CASLAction, Permission, Role } from '../../../config'
import { Conditions, Subjects } from '../CASLContext'

export function createRules(roles: Role[] = []): SubjectRawRule<CASLAction, Subjects, Conditions>[] {
  return roles.reduce((acc, role: Role) => {
    return [
      ...acc,
      ...role.permissions.map((permission: Permission) => {
        const subjectAsResource = isSingular(permission.subject.toLowerCase())
          ? plural(permission.subject.toLowerCase())
          : permission.subject.toLowerCase()
        const rawRule: RawRule = {
          action: permission.action,
          subject: permission.subject == 'all' ? 'all' : subjectAsResource,
          conditions: permission.conditions,
          inverted: permission.inverted || false,
        }

        if (Array.isArray(permission.fields) && permission.fields.length > 0) rawRule.fields = permission.fields

        return rawRule
      }),
    ]
  }, [] as any) as SubjectRawRule<CASLAction, Subjects, Conditions>[]
}

export function createAbility(rules: SubjectRawRule<CASLAction, Subjects, Conditions>[]) {
  return new Ability<[CASLAction, Subjects]>(rules)
}
