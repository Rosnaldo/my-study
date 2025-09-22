import { Entity } from "./entity"
import { NonFunctionProps } from "./utils"

export class Profile extends Entity {
  constructor(public name: string, public age: number) {
    super()
  }
}

export type ProfileProps = NonFunctionProps<Profile>
