import { Module } from '@nestjs/common'

import {
  WorkerKeyboardPressKeysCombinationActionCrudResolver,
  WorkerKeyboardPressKeysCombinationActionRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [
    WorkerKeyboardPressKeysCombinationActionCrudResolver,
    WorkerKeyboardPressKeysCombinationActionRelationsResolver,
  ],
  exports: [
    WorkerKeyboardPressKeysCombinationActionCrudResolver,
    WorkerKeyboardPressKeysCombinationActionRelationsResolver,
  ],
})
export class WorkerKeyboardPressKeysCombinationActionModule {}
