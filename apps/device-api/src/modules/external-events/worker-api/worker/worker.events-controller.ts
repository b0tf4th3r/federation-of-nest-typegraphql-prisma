import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { WorkerExternalTopic } from '../../../../constants/topics/external/worker-api'
import {
  FederationModelConnectOnePayload,
  FederationModelDisconnectOnePayload,
} from '../../../../interfaces'
import { PrismaService } from '../../../prisma/prisma.service'

@Controller()
export class WorkerWorkerApiExternalEventsController {
  constructor(private prisma: PrismaService) {}

  @EventPattern(WorkerExternalTopic.Worker_deviceId_connectOne)
  async workerDeviceIdConnectOne(@Payload() payload: FederationModelConnectOnePayload) {
    const connectNeededInDevice = await this.prisma.device.findUnique({
      where: { id: payload.connectNeededInRelatonId },
    })

    if (connectNeededInDevice)
      await this.prisma.device.update({
        where: { id: payload.connectNeededInRelatonId },
        data: {
          workersIds: { set: [...connectNeededInDevice.workersIds, payload.idToConnect] },
        },
      })
  }

  @EventPattern(WorkerExternalTopic.Worker_deviceId_disconnectOne)
  async workerDeviceIdDisconnectOne(@Payload() payload: FederationModelDisconnectOnePayload) {
    const disconnectNeededInDevice = await this.prisma.device.findUnique({
      where: { id: payload.disconnectNeededInRelationId },
    })

    if (disconnectNeededInDevice)
      await this.prisma.device.update({
        where: { id: payload.disconnectNeededInRelationId },
        data: {
          workersIds: disconnectNeededInDevice.workersIds.filter(
            (workerId) => workerId !== payload.idToDisconnect
          ),
        },
      })
  }
}
