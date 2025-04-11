import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { IUser } from '../interface/user'

export class CreateUserDto implements IUser {
  @ApiProperty({
    example: 'Andrey',
  })
  @IsString()
  firstName: string

  @ApiProperty({
    example: 'Tsuzuki',
  })
  @IsString()
  lastName: string

  @ApiProperty({
    example: 'andreytsuzuki@gmail.com',
  })
  @IsEmail()
  @IsString()
  email: string

  /*
    Matches at least one capital letter and one lower letter and one number
    stackoverflow: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  */
  @ApiProperty({
    example: '******',
  })
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/)
  password: string
}
