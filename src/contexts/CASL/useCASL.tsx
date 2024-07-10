import { useContext } from 'react'

import { CASLContext, CASLContextData } from './CASLContext'

export function useCASL(): CASLContextData {
  const context = useContext(CASLContext)

  if (!context) {
    throw new Error('useCASL can only be used within CASLProvider')
  }

  return context
}
