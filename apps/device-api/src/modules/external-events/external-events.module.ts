import { Module } from '@nestjs/common'

import { WorkerWorkerApiExternalEventsModule } from './worker-api/worker/worker.events-module'

const modules = [WorkerWorkerApiExternalEventsModule]

@Module({
  imports: modules,
  providers: [],
  exports: modules,
})
export class ExternalEventsModule {}
