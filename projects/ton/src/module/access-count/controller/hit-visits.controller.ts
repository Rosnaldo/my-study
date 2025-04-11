import { Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CountApiVisitsService } from '../service/count-api'

type ReponseType = {
  status: number
  path: string
  value: number
}

@ApiTags('access-count')
@Controller('access-count')
export class AccessCountHitVisitsController {
  constructor(private readonly countApiVisitsService: CountApiVisitsService) {}
  @Post('hit')
  async handle(): Promise<ReponseType> {
    return this.countApiVisitsService.hit()
  }
}
