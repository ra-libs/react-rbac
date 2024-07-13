import { subject } from '@casl/ability'
import { Grid } from '@mui/material'
import React from 'react'
import {
  Button,
  DeleteWithConfirmButton,
  EditButton,
  RefreshButton,
  ShowActionsProps as RaShowActionsProps,
  TopToolbar,
  useRecordContext,
  useResourceContext,
  useResourceDefinition,
  useTranslate,
} from 'react-admin'
import { useNavigate } from 'react-router-dom'

import { CASLAction } from '../../../config'
import { useCASL } from '../../../contexts'

interface ShowActionsProps extends RaShowActionsProps {
  useGoBackButton?: boolean
}

export function ShowActions(props: ShowActionsProps) {
  const { useGoBackButton = false } = props
  const record = useRecordContext()
  const resource = useResourceContext()
  const translate = useTranslate()
  const navigate = useNavigate()
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
      <Grid container justifyContent='space-between'>
        <Grid item>
          {useGoBackButton && (
            <Button
              style={{ alignSelf: 'flex-start' }}
              label={translate('buttons.go_back')}
              onClick={() => {
                navigate(-1)
              }}
            />
          )}
        </Grid>
        <Grid item>
          {hasEdit && canUpdate && <EditButton record={record} />}
          {canDelete && <DeleteWithConfirmButton record={record} />}
          {canRead && <RefreshButton />}
        </Grid>
      </Grid>
    </TopToolbar>
  )
}
