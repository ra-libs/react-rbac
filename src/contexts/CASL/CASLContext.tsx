import { createContext } from 'react'
import { Ability, ForcedSubject, MongoQuery } from '@casl/ability'
import { BoundCanProps } from '@casl/react'
import { Can } from './Can'
import { CASLAction, Role } from '../../config'
import { RaRecord } from 'react-admin'

export type Model<T, TName extends string> = T & ForcedSubject<TName>

export type RaSubjects<T extends Partial<Record<string, Record<string, unknown>>>> =
  | keyof T
  | {
      [K in keyof T]: Model<T[K], K & string>
    }[keyof T]

export type Subjects = RaSubjects<RaRecord> | 'all'
export type Conditions = MongoQuery

export type AppAbility = Ability<[CASLAction, Subjects], Conditions>

export type CASLContextData = {
  ability: AppAbility
  permissions?: Role[]
  setPermissions?: React.Dispatch<React.SetStateAction<Role[]>>
  Can: React.FunctionComponent<BoundCanProps<AppAbility>>
}

export const CASLContext = createContext<CASLContextData>({
  ability: new Ability(),
  Can: Can,
})
