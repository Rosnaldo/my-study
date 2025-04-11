import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'
import { UserCreateRepository } from 'src/module/user/repository/create.repostiory'
import { MakeMockUser } from 'test/module/user/mock/user'
import { CreateHash } from 'src/util/bcrypt'
import { UserCreateUseCase } from 'src/module/user/use-case/create.use-case'

let usecase
const mockUserCreateRepository = {
  execute: jest.fn(),
}
const mockCreateHash = {
  execute: jest.fn(),
}

const Sut = () => {
  const spy = jest.spyOn(mockUserCreateRepository, 'execute')
  jest.spyOn(mockCreateHash, 'execute').mockResolvedValueOnce('encrypted')
  return { spy }
}

describe('UserCreateUseCase', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreateUseCase],
      providers: [UserCreateRepository, CreateHash],
    })
      .setLogger(new Logger())
      .overrideProvider(UserCreateRepository)
      .useValue(mockUserCreateRepository)
      .overrideProvider(CreateHash)
      .useValue(mockCreateHash)
      .compile()

    usecase = module.get<UserCreateUseCase>(UserCreateUseCase)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Usecase should be defined', function () {
    expect(usecase).toBeDefined()
  })

  it('Should call UserCreateRepository with right param', async function () {
    const mockUser = MakeMockUser()
    const expeted = { ...mockUser, password: 'encrypted' }
    const { spy } = Sut()

    await usecase.execute(mockUser)
    expect(spy).toBeCalledWith(expeted)
  })
})
