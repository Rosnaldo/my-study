import { Equal, Expect } from "../src/utils"
import { AvatarProps } from "../src/avatar"

type Props = {
  id: string
  photo: string
}

type t = Expect<Equal<AvatarProps, Props>>
