import { PureAbility } from '@casl/ability'
import { createContext } from 'react'

import { AppAbility } from '../CASLContext'

export const AbilityContext = createContext<AppAbility>(new PureAbility())
