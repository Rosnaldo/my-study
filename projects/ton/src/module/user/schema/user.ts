import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IUser } from '../interface/user'

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  collection: 'users',
})
export class User implements IUser {
  @Prop({ type: String, required: true })
  firstName: string

  @Prop({ type: String, required: true })
  lastName: string

  @Prop({ type: String, required: true, unique: true })
  email: string

  @Prop({ type: String, required: true })
  password: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
