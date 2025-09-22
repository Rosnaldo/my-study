import { Entity } from "./entity";
import { NonFunctionProps } from "./utils";

export class Avatar extends Entity {
  constructor(public photo: string) {
    super()
  }
}

export type AvatarProps = NonFunctionProps<Avatar>
