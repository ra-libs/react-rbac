import React, { isValidElement } from 'react'
import { ResourceContextProvider, ResourceProps } from 'react-admin'
import { Route, Routes } from 'react-router-dom'
import { CASLAction } from '../../config'
import { useCASL } from '../../contexts'
import { createAbility, createRules } from '../../contexts/CASL/utils'

import { InitPermissions } from '../InitPermissions'

export const Resource = (props: ResourceProps) => {
  const { name } = props

  return (
    <ResourceContextProvider value={name}>
      <CASLResource {...props} />
    </ResourceContextProvider>
  )
}

function CASLResource(props: ResourceProps) {
  const { create: Create, edit: Edit, list: List, name, show: Show } = props
  const { ability } = useCASL()

  return (
    <>
      <InitPermissions />
      <Routes>
        {Create && ability.can(CASLAction.Create, name) && (
          <Route path='create/*' element={isValidElement(Create) ? Create : <Create />} />
        )}
        {Show && ability.can(CASLAction.Read, name) && (
          <Route path=':id/show/*' element={isValidElement(Show) ? Show : <Show />} />
        )}
        {Edit && ability.can(CASLAction.Update, name) && (
          <Route path=':id/*' element={isValidElement(Edit) ? Edit : <Edit />} />
        )}
        {List && ability.can(CASLAction.Read, name) && (
          <Route path='/*' element={isValidElement(List) ? List : <List />} />
        )}
        {props.children}
      </Routes>
    </>
  )
}

Resource.raName = 'Resource'

Resource.registerResource = (
  { create, edit, icon, list, name, options, show, recordRepresentation }: ResourceProps,
  permissions: any,
) => {
  const rules = createRules(permissions)
  const ability = createAbility(rules)
  return {
    name,
    options,
    hasList: !!list && ability.can(CASLAction.Read, name),
    hasCreate: !!create && ability.can(CASLAction.Create, name),
    hasEdit: !!edit && ability.can(CASLAction.Update, name),
    hasShow: !!show && ability.can(CASLAction.Read, name),
    icon,
    recordRepresentation,
  }
}
