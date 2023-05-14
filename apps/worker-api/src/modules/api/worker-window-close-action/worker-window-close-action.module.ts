import { Module } from '@nestjs/common'

import {
  WorkerWindowCloseActionCrudResolver,
  WorkerWindowCloseActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [WorkerWindowCloseActionCrudResolver, WorkerWindowCloseActionRelationsResolver],
  exports: [WorkerWindowCloseActionCrudResolver, WorkerWindowCloseActionRelationsResolver],
})
export class WorkerWindowCloseActionModule {}
