import React from 'react'
import { Show as RaShow, ShowProps as RaShowProps } from 'react-admin'
import { ShowActions } from '../actions/ShowActions'

type ShowProps = RaShowProps

export function Show(props: ShowProps) {
  const { children, ...rest } = props

  return (
    <RaShow actions={<ShowActions />} {...rest}>
      {children}
    </RaShow>
  )
}
