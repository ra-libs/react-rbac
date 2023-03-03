import React from 'react'
import { subject } from '@casl/ability'

import {
  DeleteWithConfirmButton,
  EditButton,
  RefreshButton,
  ShowActionsProps,
  TopToolbar,
  useRecordContext,
  useResourceContext,
  useResourceDefinition,
} from 'react-admin'
import { CASLAction } from '../../../config'
import { useCASL } from '../../../contexts'

export function ShowActions(props: ShowActionsProps) {
  const record = useRecordContext()
  const resource = useResourceContext()
  const { hasEdit } = useResourceDefinition()
  const { ability } = useCASL()

  let canDelete = false,
    canUpdate = false,
    canRead = false
  try {
    canDelete = ability.can(CASLAction.Delete, subject(resource, record))
    canUpdate = ability.can(CASLAction.Update, subject(resource, record))
    canRead = ability.can(CASLAction.Read, subject(resource, record))
  } catch (error) {
    console.error(error)
  }

  if (!record) return null

  return (
    <TopToolbar className={props.className}>
      {hasEdit && canUpdate && <EditButton record={record} />}
      {canDelete && <DeleteWithConfirmButton record={record} />}
      {canRead && <RefreshButton />}
    </TopToolbar>
  )
}
