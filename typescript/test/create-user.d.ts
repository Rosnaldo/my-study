import { Avatar, AvatarProps } from "../src/avatar"
import { Profile,ProfileProps } from "../src/profile"
import { Equal, Expect, Merge, OmitId } from "../src/utils"

export type CreateUserDto = {
  photo: Avatar['photo']
  name: Profile['name']
  age: Profile['age']
}

type Props = Merge<OmitId<AvatarProps>, OmitId<ProfileProps>>
type t = Expect<Equal<CreateUserDto, Props>>
