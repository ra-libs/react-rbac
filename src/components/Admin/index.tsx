import React from 'react'
import { Admin as RaAdmin, AdminProps } from 'react-admin'
import { CASLProvider } from '../../contexts'

export function Admin(props: AdminProps) {
  const { children, ...rest } = props
  return (
    <CASLProvider>
      <RaAdmin {...rest}>{children}</RaAdmin>
    </CASLProvider>
  )
}
