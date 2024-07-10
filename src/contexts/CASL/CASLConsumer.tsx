import React from 'react'

import { CASLContext, CASLContextData } from './CASLContext'

type CASLConsumerProps = {
  children(context: CASLContextData): React.ReactNode
}

export function CASLConsumer(props: CASLConsumerProps) {
  const { children } = props
  return (
    <CASLContext.Consumer>
      {(context) => {
        if (!context) {
          throw new Error('CASLConsumer can only be used within CASLProvider')
        }
        return <>{children}</>
      }}
    </CASLContext.Consumer>
  )
}
