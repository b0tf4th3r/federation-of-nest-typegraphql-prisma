import { Module } from '@nestjs/common'

import {
  WorkerKeyboardTypeTextActionCrudResolver,
  WorkerKeyboardTypeTextActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [
    WorkerKeyboardTypeTextActionCrudResolver,
    WorkerKeyboardTypeTextActionRelationsResolver,
  ],
  exports: [
    WorkerKeyboardTypeTextActionCrudResolver,
    WorkerKeyboardTypeTextActionRelationsResolver,
  ],
})
export class WorkerKeyboardTypeTextActionModule {}
