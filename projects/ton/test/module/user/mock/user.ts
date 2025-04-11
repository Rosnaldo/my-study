import { Types } from 'mongoose'
import { IUser } from 'src/module/user/interface/user'

const ObjectId = Types.ObjectId

export const MakeMockUser = (): IUser => ({
  _id: ObjectId('5ce1d6bb8fef73750f97e941'),
  firstName: 'Andrey',
  lastName: 'Tsuzuki',
  email: 'andreytsuzuzki@gmail.com',
  password: 'Gtdneug32',
})
