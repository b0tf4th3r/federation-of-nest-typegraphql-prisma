import { Module } from '@nestjs/common'

import {
  WorkerKeyboardActionCrudResolver,
  WorkerKeyboardActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [WorkerKeyboardActionCrudResolver, WorkerKeyboardActionRelationsResolver],
  exports: [WorkerKeyboardActionCrudResolver, WorkerKeyboardActionRelationsResolver],
})
export class WorkerKeyboardActionModule {}
