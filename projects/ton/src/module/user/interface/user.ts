import { IEntity } from 'src/util/entity'

export interface IUser extends IEntity {
  firstName: string
  lastName: string
  email: string
  password: string
}
