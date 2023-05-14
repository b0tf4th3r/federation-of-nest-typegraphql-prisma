import { Module } from '@nestjs/common'

import {
  WorkerWindowActionCrudResolver,
  WorkerWindowActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [WorkerWindowActionCrudResolver, WorkerWindowActionRelationsResolver],
  exports: [WorkerWindowActionCrudResolver, WorkerWindowActionRelationsResolver],
})
export class WorkerWindowActionModule {}
