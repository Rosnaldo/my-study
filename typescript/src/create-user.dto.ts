import { Avatar } from "./avatar"
import { Profile } from "./profile"
import { User } from "./user"

export type CreateUserDto = {
  photo: Avatar['photo']
  name: Profile['name']
  age: Profile['age']
}

export const createUser = (props: CreateUserDto): User => {
  const { photo, name, age } = props
  const avatar = new Avatar(photo)
  const profile = new Profile(name, age)
  const user = new User(avatar, profile)
  return user
} 

