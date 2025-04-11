import { Types } from 'mongoose'

export interface IEntity {
  _id?: Types.ObjectId
  created?: Date
  updated?: Date
}
