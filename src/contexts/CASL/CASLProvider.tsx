import React, { useEffect, useState } from 'react'
import { ConditionsMatcher, MatchConditions, PureAbility, RawRuleOf, SubjectRawRule } from '@casl/ability'
import { AppAbility, CASLContext, Subjects } from './CASLContext'
import { plural, isSingular } from 'pluralize'
import { AbilityProvider } from './Ability'
import { Can } from './Can'
import { CASLAction, Role } from '../../config'

type CASLProviderProps = {
  children: React.ReactNode
}

export function CASLProvider(props: CASLProviderProps) {
  const { children } = props
  const [permissions, setPermissions] = useState<Role[]>([])
  const [rules, setRules] = useState<SubjectRawRule<CASLAction, Subjects, MatchConditions>[]>([])

  const [ability, setAbility] = useState<PureAbility<[CASLAction, Subjects], MatchConditions>>(new PureAbility())

  useEffect(() => {
    const rules = permissions.reduce((acc: any[], role: any) => {
      return [
        ...acc,
        ...role.permissions.map((permission: any) => {
          const subjectAsResource = isSingular(permission.subject.toLowerCase())
            ? plural(permission.subject.toLowerCase())
            : permission.subject.toLowerCase()
          return {
            action: permission.action,
            subject: permission.subject == 'all' ? 'all' : subjectAsResource,
            conditions: permission.conditions,
            inverted: permission.inverted || false,
          }
        }),
      ]
    }, [] as RawRuleOf<AppAbility>[])
    setRules(rules)
  }, [permissions])

  const lambdaMatcher: ConditionsMatcher<MatchConditions> = (matchConditions) => matchConditions

  useEffect(() => {
    setAbility(
      new PureAbility<[CASLAction, Subjects], MatchConditions>(rules, {
        conditionsMatcher: lambdaMatcher,
      }),
    )
  }, [rules])

  return (
    <CASLContext.Provider value={{ ability, setPermissions, permissions, Can: Can }}>
      <AbilityProvider>{children}</AbilityProvider>
    </CASLContext.Provider>
  )
}
