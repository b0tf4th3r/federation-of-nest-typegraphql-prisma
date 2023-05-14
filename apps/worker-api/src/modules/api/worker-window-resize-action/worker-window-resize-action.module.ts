import { Module } from '@nestjs/common'

import {
  WorkerWindowResizeActionCrudResolver,
  WorkerWindowResizeActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [WorkerWindowResizeActionCrudResolver, WorkerWindowResizeActionRelationsResolver],
  exports: [WorkerWindowResizeActionCrudResolver, WorkerWindowResizeActionRelationsResolver],
})
export class WorkerWindowResizeActionModule {}
