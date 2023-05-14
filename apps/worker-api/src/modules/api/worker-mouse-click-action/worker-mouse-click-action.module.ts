import { Module } from '@nestjs/common'

import {
  WorkerMouseClickActionCrudResolver,
  WorkerMouseClickActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [WorkerMouseClickActionCrudResolver, WorkerMouseClickActionRelationsResolver],
  exports: [WorkerMouseClickActionCrudResolver, WorkerMouseClickActionRelationsResolver],
})
export class WorkerMouseClickActionModule {}
