import { Body, Controller, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/module/user/dto/create.dto'
import { IUser } from 'src/module/user/interface/user'
import { UserCreateUseCase } from 'src/module/user/use-case/create.use-case'
import { MongoDuplicateUserEmailExceptionFilter } from 'src/module/user/error-handler/mongo-duplicate-user-email.exception.filter'
import { SentryService } from '@ntegral/nestjs-sentry'
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter'

@ApiTags('users')
@Controller('users')
export class UserCreateController {
  constructor(private readonly userCreateUseCase: UserCreateUseCase) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(new HttpExceptionFilter(), new MongoDuplicateUserEmailExceptionFilter(new SentryService()))
  async handle(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userCreateUseCase.execute(createUserDto)
  }
}
