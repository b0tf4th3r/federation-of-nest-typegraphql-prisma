import { Module } from '@nestjs/common'

import { WorkerActionModule } from './worker-action/worker-action.module'
import { WorkerKeyboardActionModule } from './worker-keyboard-action/worker-keyboard-action.module'
import { WorkerKeyboardPressKeyActionModule } from './worker-keyboard-press-key-action/worker-keyboard-press-key-action.module'
import { WorkerKeyboardPressKeysCombinationActionModule } from './worker-keyboard-press-keys-combination-action/worker-keyboard-press-keys-combination-action.module'
import { WorkerKeyboardTypeTextActionModule } from './worker-keyboard-type-text-action/worker-keyboard-type-text-action.module'
import { WorkerMouseActionModule } from './worker-mouse-action/worker-mouse-action.module'
import { WorkerMouseClickActionModule } from './worker-mouse-click-action/worker-mouse-click-action.module'
import { WorkerMouseMoveActionModule } from './worker-mouse-move-action/worker-mouse-move-action.module'
import { WorkerWindowActionModule } from './worker-window-action/worker-window-action.module'
import { WorkerWindowCloseActionModule } from './worker-window-close-action/worker-window-close-action.module'
import { WorkerWindowMoveActionModule } from './worker-window-move-action/worker-window-move-action.module'
import { WorkerWindowOpenActionModule } from './worker-window-open-action/worker-window-open-action.module'
import { WorkerWindowResizeActionModule } from './worker-window-resize-action/worker-window-resize-action.module'
import { WorkerModule } from './worker/worker.module'

const modules = [
  WorkerModule,
  WorkerActionModule,
  WorkerKeyboardActionModule,
  WorkerKeyboardPressKeyActionModule,
  WorkerKeyboardPressKeysCombinationActionModule,
  WorkerKeyboardTypeTextActionModule,
  WorkerMouseActionModule,
  WorkerMouseClickActionModule,
  WorkerMouseMoveActionModule,
  WorkerWindowActionModule,
  WorkerWindowCloseActionModule,
  WorkerWindowMoveActionModule,
  WorkerWindowOpenActionModule,
  WorkerWindowResizeActionModule,
]

@Module({
  imports: modules,
  providers: [],
  exports: modules,
})
export class ApiModule {}
