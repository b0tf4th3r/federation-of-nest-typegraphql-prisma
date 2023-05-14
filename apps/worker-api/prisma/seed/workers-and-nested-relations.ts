import { PrismaClient, WorkerActionType, WorkerMouseButton } from '@prisma/client'

import { getRandomInt } from '../../src/utils'

export const handleWorkersAndNestedRelations = async (input: { prisma: PrismaClient }) => {
  const workerActionsTypes = [
    WorkerActionType.KEYBOARD_PRESS_KEY,
    WorkerActionType.KEYBOARD_PRESS_KEYS_COMBINATION,
    WorkerActionType.KEYBOARD_TYPE_TEXT,
    WorkerActionType.MOUSE_CLICK,
    WorkerActionType.MOUSE_MOVE,
    WorkerActionType.WINDOW_CLOSE,
    WorkerActionType.WINDOW_MOVE,
    WorkerActionType.WINDOW_OPEN,
    WorkerActionType.WINDOW_RESIZE,
  ]

  for (let workerIndex = 1; workerIndex < 11; workerIndex++) {
    const createdWorker = await input.prisma.worker.create({
      data: {
        deviceId: workerIndex,
      },
    })

    for (let workerActionIndex = 0; workerActionIndex < getRandomInt(20); workerActionIndex++) {
      const randomWorkerActionType =
        workerActionsTypes[Math.floor(Math.random() * workerActionsTypes.length)]

      await input.prisma.workerAction.create({
        data: {
          type: randomWorkerActionType,
          asKeyboardAction: [
            WorkerActionType.KEYBOARD_PRESS_KEY,
            WorkerActionType.KEYBOARD_PRESS_KEYS_COMBINATION,
            WorkerActionType.KEYBOARD_TYPE_TEXT,
          ].some((el) => el === randomWorkerActionType)
            ? {
                create: {
                  asPressKeyAction:
                    randomWorkerActionType === WorkerActionType.KEYBOARD_PRESS_KEY
                      ? {
                          create: {
                            keyCode: getRandomInt(249),
                            numberOfKeyPresses: getRandomInt(4),
                          },
                        }
                      : undefined,
                  asPressKeysCombinationAction:
                    randomWorkerActionType === WorkerActionType.KEYBOARD_PRESS_KEYS_COMBINATION
                      ? {
                          create: {
                            keyCodes: { set: [getRandomInt(249), getRandomInt(249)] },
                          },
                        }
                      : undefined,
                  asTypeTextAction:
                    randomWorkerActionType === WorkerActionType.KEYBOARD_TYPE_TEXT
                      ? {
                          create: {
                            text: 'Lorem ipsum',
                          },
                        }
                      : undefined,
                },
              }
            : undefined,
          asMouseAction: [WorkerActionType.MOUSE_CLICK, WorkerActionType.MOUSE_MOVE].some(
            (el) => el === randomWorkerActionType
          )
            ? {
                create: {
                  asMouseClickAction:
                    randomWorkerActionType === WorkerActionType.MOUSE_CLICK
                      ? {
                          create: {
                            button: [
                              WorkerMouseButton.LEFT,
                              WorkerMouseButton.MIDDLE,
                              WorkerMouseButton.RIGHT,
                            ][Math.floor(Math.random() * 3)],
                            isDoubleClick: false,
                            coordinates: { set: [getRandomInt(1920), getRandomInt(1080)] },
                          },
                        }
                      : undefined,
                  asMouseMoveAction:
                    randomWorkerActionType === WorkerActionType.MOUSE_MOVE
                      ? {
                          create: {
                            coordinates: { set: [getRandomInt(1920), getRandomInt(1080)] },
                          },
                        }
                      : undefined,
                },
              }
            : undefined,
          asWindowAction: [
            WorkerActionType.WINDOW_CLOSE,
            WorkerActionType.WINDOW_MOVE,
            WorkerActionType.WINDOW_OPEN,
            WorkerActionType.WINDOW_RESIZE,
          ].some((el) => el === randomWorkerActionType)
            ? {
                create: {
                  asWindowCloseAction:
                    randomWorkerActionType === WorkerActionType.WINDOW_CLOSE
                      ? {
                          create: {
                            pid: getRandomInt(8888),
                          },
                        }
                      : undefined,
                  asWindowMoveAction:
                    randomWorkerActionType === WorkerActionType.MOUSE_MOVE
                      ? {
                          create: {
                            newCoordinates: { set: [getRandomInt(1920), getRandomInt(1080)] },
                          },
                        }
                      : undefined,
                  asWindowOpenAction:
                    randomWorkerActionType === WorkerActionType.WINDOW_OPEN
                      ? {
                          create: {
                            launcherExePath: 'C://pathtofile.exe',
                          },
                        }
                      : undefined,
                  asWindowResizeAction:
                    randomWorkerActionType === WorkerActionType.WINDOW_RESIZE
                      ? {
                          create: {
                            newSize: { set: [getRandomInt(1920), getRandomInt(1080)] },
                          },
                        }
                      : undefined,
                },
              }
            : undefined,
          worker: { connect: { id: createdWorker.id } },
        },
      })
    }
  }
}
