import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'
import { AccessCountGetVisitsController } from 'src/module/access-count/controller/get-visits.controller'
import { CountApiVisitsService } from 'src/module/access-count/service/count-api'

let controller
const mockCountApiVisitsService = {
  get: jest.fn(),
}

const Sut = () => {
  const spy = jest.spyOn(mockCountApiVisitsService, 'get').mockResolvedValueOnce({ value: 1 })
  return { spy }
}

describe('AccessCountGetVisitsController', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessCountGetVisitsController],
      providers: [CountApiVisitsService],
    })
      .setLogger(new Logger())
      .overrideProvider(CountApiVisitsService)
      .useValue(mockCountApiVisitsService)
      .compile()

    controller = module.get<AccessCountGetVisitsController>(AccessCountGetVisitsController)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Controller should be defined', function () {
    expect(controller).toBeDefined()
  })

  it('Should call CountApiVisitsService.get to be called', async function () {
    const { spy } = Sut()

    await controller.handle()
    expect(spy).toBeCalled()
  })
})
