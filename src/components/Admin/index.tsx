import React from 'react'
import { Admin as RaAdmin, AdminProps } from 'react-admin'

import { CASLProvider } from '../../contexts'

// Overriding the ra-ui-materialui/src/AdminUI.tsx

export function Admin(props: AdminProps) {
  const { children, ...rest } = props
  return (
    <CASLProvider>
      <RaAdmin {...rest}>{children}</RaAdmin>
    </CASLProvider>
  )
}
