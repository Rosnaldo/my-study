import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser } from '../interface/user'
import { UserDocument } from '../schema/user'

@Injectable()
export class UserCreateRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>
  ) {}

  async execute(data: IUser): Promise<IUser> {
    const model = await this.userModel.create(data)
    return model.toJSON()
  }
}
