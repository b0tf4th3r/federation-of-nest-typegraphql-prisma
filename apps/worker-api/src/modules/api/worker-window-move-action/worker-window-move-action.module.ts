import { Module } from '@nestjs/common'

import {
  WorkerWindowMoveActionCrudResolver,
  WorkerWindowMoveActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [WorkerWindowMoveActionCrudResolver, WorkerWindowMoveActionRelationsResolver],
  exports: [WorkerWindowMoveActionCrudResolver, WorkerWindowMoveActionRelationsResolver],
})
export class WorkerWindowMoveActionModule {}
