import React from 'react'
import { Show as RaShow, ShowProps as RaShowProps } from 'react-admin'

import { ShowActions } from '../actions/ShowActions'

type ShowProps = RaShowProps

// Overriding the ra-ui-materialui/src/detail/Show.tsx

export function Show(props: ShowProps) {
  const { children, ...rest } = props

  return (
    <RaShow actions={<ShowActions />} {...rest}>
      {children}
    </RaShow>
  )
}
