import React from 'react'
import { List as RaList, ListProps } from 'react-admin'

import { ListActions } from '../actions/ListActions'

// Overriding the ra-ui-materialui/src/list/List.tsx

export function List(props: ListProps) {
  const { children, ...rest } = props
  return (
    <RaList actions={<ListActions />} {...rest}>
      {children}
    </RaList>
  )
}
