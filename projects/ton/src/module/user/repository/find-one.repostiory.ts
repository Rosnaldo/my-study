import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, PopulateOptions } from 'mongoose'
import { IUser } from '../interface/user'
import { UserDocument } from '../schema/user'

@Injectable()
export class UserFindOneRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>
  ) {}

  async execute(where: FilterQuery<UserDocument>, populate: PopulateOptions[] = []): Promise<IUser> {
    const model = await this.userModel.findOne(where).populate(populate).exec()
    return model?.toJSON()
  }
}
