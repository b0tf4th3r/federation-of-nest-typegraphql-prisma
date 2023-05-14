import { Module } from '@nestjs/common'

import {
  WorkerMouseActionCrudResolver,
  WorkerMouseActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [WorkerMouseActionCrudResolver, WorkerMouseActionRelationsResolver],
  exports: [WorkerMouseActionCrudResolver, WorkerMouseActionRelationsResolver],
})
export class WorkerMouseActionModule {}
