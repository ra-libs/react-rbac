import React, { ComponentType, isValidElement, ReactElement } from 'react'
import { ResourceContextProvider, ResourceProps as RaResourceProps, RestoreScrollPosition } from 'react-admin'
import { isValidElementType } from 'react-is'
import { Route, Routes } from 'react-router-dom'

import { CASLAction } from '../../config'
import { useCASL } from '../../contexts'
import { createAbility, createRules } from '../../contexts/CASL/utils'
import { InitPermissions } from '../InitPermissions'

// Copied from: ra-core/src/core/Resource.tsx

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
  const { create, edit, list, name, subject, show } = props
  const { ability } = useCASL()

  const permissionName = subject ? subject : name

  return (
    <>
      <InitPermissions />
      <ResourceContextProvider value={name}>
        <Routes>
          {create && ability.can(CASLAction.Create, permissionName) && (
            <Route path='create/*' element={getElement(create)} />
          )}
          {show && ability.can(CASLAction.Read, permissionName) && (
            <Route path=':id/show/*' element={getElement(show)} />
          )}
          {edit && ability.can(CASLAction.Update, permissionName) && <Route path=':id/*' element={getElement(edit)} />}
          {list && ability.can(CASLAction.Read, permissionName) && (
            <Route
              path='/*'
              element={
                <RestoreScrollPosition storeKey={`${name}.list.scrollPosition`}>
                  {getElement(list)}
                </RestoreScrollPosition>
              }
            />
          )}
          {props.children}
        </Routes>
      </ResourceContextProvider>
    </>
  )
}

const getElement = (ElementOrComponent: ComponentType<any> | ReactElement) => {
  if (isValidElement(ElementOrComponent)) {
    return ElementOrComponent
  }

  if (isValidElementType(ElementOrComponent)) {
    const Element = ElementOrComponent as ComponentType<any>
    return <Element />
  }

  return null
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
