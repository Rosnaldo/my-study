import { Equal, Expect } from "../src/utils"
import { ProfileProps } from "../src/profile"

type Props = {
  id: string
  name: string
  age: number
}

type t = Expect<Equal<ProfileProps, Props>>
