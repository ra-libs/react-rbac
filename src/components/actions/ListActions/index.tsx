import React from 'react'
import { CreateButton, FilterButton, ListProps, TopToolbar, useResourceDefinition } from 'react-admin'

import { CASLAction } from '../../../config'
import { useCASL } from '../../../contexts'

interface ListActionsProps {
  filters?: Pick<ListProps, 'filters'>
}

export function ListActions(props: ListActionsProps) {
  const { filters } = props
  const { hasCreate, name } = useResourceDefinition()
  const { Can } = useCASL()
  return (
    <TopToolbar>
      {filters && <FilterButton />}
      <Can I={CASLAction.Create} a={name}>
        {hasCreate && <CreateButton />}
      </Can>
    </TopToolbar>
  )
}
