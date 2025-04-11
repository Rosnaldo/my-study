import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'
import { UserCreateController } from 'src/module/user/controller/create.controller'
import { MakeMockUser } from 'test/module/user/mock/user'
import { UserCreateUseCase } from 'src/module/user/use-case/create.use-case'

let controller
const mockUserCreateUseCase = {
  execute: jest.fn(),
}

const Sut = () => {
  const spy = jest.spyOn(mockUserCreateUseCase, 'execute')
  return { spy }
}

describe('UserCreateController', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreateController],
      providers: [UserCreateUseCase],
    })
      .setLogger(new Logger())
      .overrideProvider(UserCreateUseCase)
      .useValue(mockUserCreateUseCase)
      .compile()

    controller = module.get<UserCreateController>(UserCreateController)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Controller should be defined', function () {
    expect(controller).toBeDefined()
  })

  it('Should call UserCreateRepository with right param', async function () {
    const mockUser = MakeMockUser()
    const { spy } = Sut()

    await controller.handle(mockUser)
    expect(spy).toBeCalledWith(mockUser)
  })
})
