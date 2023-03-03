import React, { useEffect, useState } from 'react'
import { Ability, SubjectRawRule } from '@casl/ability'
import { CASLContext, Conditions, Subjects } from './CASLContext'
import { AbilityProvider } from './Ability'
import { Can } from './Can'
import { CASLAction, Role } from '../../config'

import { createAbility, createRules } from './utils'

type CASLProviderProps = {
  children: React.ReactNode
}

export function CASLProvider(props: CASLProviderProps) {
  const { children } = props
  const [permissions, setPermissions] = useState<Role[]>([])
  const [rules, setRules] = useState<SubjectRawRule<CASLAction, Subjects, Conditions>[]>([])

  const [ability, setAbility] = useState<Ability<[CASLAction, Subjects], Conditions>>(new Ability())

  useEffect(() => {
    const rules = createRules(permissions)
    setRules(rules)
  }, [permissions])

  useEffect(() => {
    setAbility(createAbility(rules))
  }, [rules])

  return (
    <CASLContext.Provider value={{ ability, setPermissions, permissions, Can: Can }}>
      <AbilityProvider>{children}</AbilityProvider>
    </CASLContext.Provider>
  )
}
