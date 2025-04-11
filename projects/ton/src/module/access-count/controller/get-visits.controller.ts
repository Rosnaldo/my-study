import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CountApiVisitsService } from '../service/count-api'

type ReponseType = {
  status: number
  path: string
  value: number
}

@ApiTags('access-count')
@Controller('access-count')
export class AccessCountGetVisitsController {
  constructor(private readonly countApiVisitsService: CountApiVisitsService) {}
  @Get()
  async handle(): Promise<ReponseType> {
    return this.countApiVisitsService.get()
  }
}
