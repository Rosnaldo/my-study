import bcrypt from 'bcryptjs'
import { CreateHash } from 'src/util/bcrypt'

const spy = jest.spyOn(bcrypt, 'hash')

let createHash
describe('CreateHash', () => {
  beforeAll(async () => {
    createHash = new CreateHash()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Should call CreateHash with right param', async function () {
    const password = 'any'
    await createHash.execute(password)
    expect(spy).toBeCalledWith(password, 10)
  })
})
