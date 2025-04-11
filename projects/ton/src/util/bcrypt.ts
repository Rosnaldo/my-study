import * as bcrypt from 'bcryptjs'

export class CreateHash {
  async execute(string: string): Promise<string> {
    const saltRounds = 10
    return bcrypt.hash(string, saltRounds)
  }
}
