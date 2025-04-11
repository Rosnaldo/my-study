import { Injectable } from '@nestjs/common'
import { CreateHash } from 'src/util/bcrypt'
import { CreateUserDto } from 'src/module/user/dto/create.dto'
import { IUser } from 'src/module/user/interface/user'
import { UserCreateRepository } from 'src/module/user/repository/create.repostiory'

@Injectable()
export class UserCreateUseCase {
  constructor(private readonly userCreateRepository: UserCreateRepository, private readonly createHash: CreateHash) {}

  async execute(createUserDto: CreateUserDto): Promise<IUser> {
    createUserDto.password = await this.createHash.execute(createUserDto.password)
    return this.userCreateRepository.execute(createUserDto)
  }
}
