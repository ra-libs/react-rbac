import React from 'react'
import { List as RaList, ListProps } from 'react-admin'
import { ListActions } from '../actions/ListActions'

export function List(props: ListProps) {
  const { children, ...rest } = props
  return (
    <RaList actions={<ListActions filters={rest.filters as any} />} {...rest}>
      {children}
    </RaList>
  )
}
