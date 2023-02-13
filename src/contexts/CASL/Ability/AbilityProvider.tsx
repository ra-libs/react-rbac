import React from 'react'
import { useCASL } from '../useCASL'
import { AbilityContext } from './AbilityContext'

type AbilityProviderProps = {
  children: React.ReactNode
}

export function AbilityProvider(props: AbilityProviderProps) {
  const { children } = props
  const { ability } = useCASL()

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
}
