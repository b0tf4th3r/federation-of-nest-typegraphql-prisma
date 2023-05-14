import { Module } from '@nestjs/common'

import {
  WorkerMouseMoveActionCrudResolver,
  WorkerMouseMoveActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [WorkerMouseMoveActionCrudResolver, WorkerMouseMoveActionRelationsResolver],
  exports: [WorkerMouseMoveActionCrudResolver, WorkerMouseMoveActionRelationsResolver],
})
export class WorkerMouseMoveActionModule {}
