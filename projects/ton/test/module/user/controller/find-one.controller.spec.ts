import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException, Logger } from '@nestjs/common'
import { UserFindOneController } from 'src/module/user/controller/find-one.controller'
import { UserFindOneRepository } from 'src/module/user/repository/find-one.repostiory'
import { IUser } from 'src/module/user/interface/user'
import { MakeMockUser } from 'test/module/user/mock/user'

let controller
const mockUserFindOneRepository = {
  execute: jest.fn(),
}

const Sut = (user: IUser) => {
  const spy = jest.spyOn(mockUserFindOneRepository, 'execute').mockResolvedValue(user)
  return { spy }
}

describe('UserFindOneController', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFindOneController],
      providers: [UserFindOneRepository],
    })
      .setLogger(new Logger())
      .overrideProvider(UserFindOneRepository)
      .useValue(mockUserFindOneRepository)
      .compile()

    controller = module.get<UserFindOneController>(UserFindOneController)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Controller should be defined', function () {
    expect(controller).toBeDefined()
  })

  it('Should call UserFindOneRepository with right param', async function () {
    const { spy } = Sut(MakeMockUser())
    const userId = '5ce1d6bb8fef73750f97e941'
    await controller.handle(userId)
    expect(spy).toBeCalledWith({ _id: userId })
  })

  it('When user not found should throw', async function () {
    Sut(null)
    const promise = controller.handle()
    expect(promise).rejects.toThrowError(BadRequestException)
  })
})
