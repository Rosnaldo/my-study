import { Module } from '@nestjs/common'
import { AccessCountGetVisitsController } from './controller/get-visits.controller'
import { AccessCountHitVisitsController } from './controller/hit-visits.controller'
import { CountApiVisitsService } from './service/count-api'

@Module({
  imports: [],
  providers: [CountApiVisitsService],
  controllers: [AccessCountGetVisitsController, AccessCountHitVisitsController],
  exports: [],
})
export class AccessCountModule {}
