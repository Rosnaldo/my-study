import { Avatar } from "./avatar";
import { Entity } from "./entity";
import { Profile } from "./profile";

export class User extends Entity {
  constructor(
    public avatar: Avatar,
    public profile: Profile,
  ) {
    super()
  }
}