import { Module } from '@nestjs/common'

import {
  WorkerKeyboardPressKeyActionCrudResolver,
  WorkerKeyboardPressKeyActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [
    WorkerKeyboardPressKeyActionCrudResolver,
    WorkerKeyboardPressKeyActionRelationsResolver,
  ],
  exports: [
    WorkerKeyboardPressKeyActionCrudResolver,
    WorkerKeyboardPressKeyActionRelationsResolver,
  ],
})
export class WorkerKeyboardPressKeyActionModule {}
