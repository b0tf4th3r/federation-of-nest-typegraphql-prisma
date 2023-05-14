import { Module } from '@nestjs/common'

import { PrismaModule } from '../../../prisma/prisma.module'
import { WorkerWorkerApiExternalEventsController } from './worker.events-controller'

@Module({
  imports: [PrismaModule],
  controllers: [WorkerWorkerApiExternalEventsController],
  providers: [WorkerWorkerApiExternalEventsController],
  exports: [WorkerWorkerApiExternalEventsController],
})
export class WorkerWorkerApiExternalEventsModule {}
