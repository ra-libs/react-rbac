import React from 'react'
import { usePermissions } from 'react-admin'
import { isEqual } from 'lodash'
import { useCASL } from '../../contexts'

export function InitPermissions() {
  const { permissions, isLoading } = usePermissions({}, { cacheTime: 0 })
  const { setPermissions, permissions: caslPermissions } = useCASL()

  if (!isLoading && !isEqual(permissions, caslPermissions) && setPermissions) {
    setPermissions(permissions)
  }

  return null
}
