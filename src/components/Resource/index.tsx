import React, { isValidElement } from 'react'
import { ResourceContextProvider, ResourceProps as RaResourceProps } from 'react-admin'
import { Route, Routes } from 'react-router-dom'

import { CASLAction } from '../../config'
import { useCASL } from '../../contexts'
import { createAbility, createRules } from '../../contexts/CASL/utils'
import { InitPermissions } from '../InitPermissions'

export type ResourceProps = RaResourceProps & {
  list?: React.ElementType
  create?: React.ElementType
  edit?: React.ElementType
  show?: React.ElementType

  /** CASL permission subject to override resource name */
  subject?: string
}

export const Resource = (props: ResourceProps) => {
  const { name } = props

  return (
    <ResourceContextProvider value={name}>
      <CASLResource {...props} />
    </ResourceContextProvider>
  )
}

function CASLResource(props: ResourceProps) {
  const { create: Create, edit: Edit, list: List, name, subject, show: Show } = props
  const { ability } = useCASL()

  const permissionName = subject ? subject : name

  return (
    <>
      <InitPermissions />
      <Routes>
        {Create && ability.can(CASLAction.Create, permissionName) && (
          <Route path='create/*' element={isValidElement(Create) ? Create : <Create />} />
        )}
        {Show && ability.can(CASLAction.Read, permissionName) && (
          <Route path=':id/show/*' element={isValidElement(Show) ? Show : <Show />} />
        )}
        {Edit && ability.can(CASLAction.Update, permissionName) && (
          <Route path=':id/*' element={isValidElement(Edit) ? Edit : <Edit />} />
        )}
        {List && ability.can(CASLAction.Read, permissionName) && (
          <Route path='/*' element={isValidElement(List) ? List : <List />} />
        )}
        {props.children}
      </Routes>
    </>
  )
}

Resource.raName = 'Resource'

Resource.registerResource = (
  {
    create,
    edit,
    icon,
    list,
    name,
    options,
    show,
    recordRepresentation,
    hasCreate,
    hasEdit,
    hasShow,
    subject,
  }: ResourceProps,
  permissions: any,
) => {
  const rules = createRules(permissions)
  const ability = createAbility(rules)
  const permissionName = subject ? subject : name
  return {
    name,
    options,
    hasList: !!list && ability.can(CASLAction.Read, permissionName),
    hasCreate: (!!create || !!hasCreate) && ability.can(CASLAction.Create, permissionName),
    hasEdit: (!!edit || !!hasEdit) && ability.can(CASLAction.Update, permissionName),
    hasShow: (!!show || !!hasShow) && ability.can(CASLAction.Read, permissionName),
    icon,
    recordRepresentation,
  }
}
