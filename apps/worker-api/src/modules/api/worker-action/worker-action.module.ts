import { Module } from '@nestjs/common'
import { WorkerActionCrudResolver, WorkerActionRelationsResolver } from '../../../../__generated__/typegraphql-prisma';

@Module({
  imports: [],
  providers: [WorkerActionCrudResolver, WorkerActionRelationsResolver],
  exports: [WorkerActionCrudResolver, WorkerActionRelationsResolver],
})
export class WorkerActionModule {}
