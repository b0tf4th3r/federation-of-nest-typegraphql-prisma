import { Module } from '@nestjs/common'

import {
  WorkerCrudResolver,
  WorkerRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [
  ],
  providers: [WorkerCrudResolver, WorkerRelationsResolver],
  exports: [WorkerCrudResolver, WorkerRelationsResolver],
})
export class WorkerModule {}
