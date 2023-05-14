import { Module } from '@nestjs/common'

import {
  WorkerWindowOpenActionCrudResolver,
  WorkerWindowOpenActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [WorkerWindowOpenActionCrudResolver, WorkerWindowOpenActionRelationsResolver],
  exports: [WorkerWindowOpenActionCrudResolver, WorkerWindowOpenActionRelationsResolver],
})
export class WorkerWindowOpenActionModule {}
