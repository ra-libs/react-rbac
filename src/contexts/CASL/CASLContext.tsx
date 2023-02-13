import { createContext } from 'react'
import { PureAbility } from '@casl/ability'
import { BoundCanProps } from '@casl/react'
import { Can } from './Can'
import { CASLAction, Role } from '../../config'

export type Subjects = 'all' | string
export type AppAbility = PureAbility<[CASLAction, Subjects]>

export type CASLContextData = {
  ability: AppAbility
  permissions?: Role[]
  setPermissions?: React.Dispatch<React.SetStateAction<Role[]>>
  Can: React.FunctionComponent<BoundCanProps<AppAbility>>
}

export const CASLContext = createContext<CASLContextData>({
  ability: new PureAbility(),
  Can: Can,
})
