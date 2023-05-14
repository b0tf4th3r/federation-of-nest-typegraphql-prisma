import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { DeviceExternalTopic } from '../../../../constants/topics/external/device-api'
import {
  FederationModelConnectManyPayload,
  FederationModelDisconnectManyPayload,
} from '../../../../interfaces'
import { PrismaService } from '../../../prisma/prisma.service'

@Controller()
export class DeviceDeviceApiExternalEventsController {
  constructor(private prisma: PrismaService) {}

  @EventPattern(DeviceExternalTopic.Device_workersIds_connectMany)
  async deviceWorkersIdsConnectMany(@Payload() payload: FederationModelConnectManyPayload) {
    const connectNeededInWorkers = await this.prisma.worker.findMany({
      where: { id: { in: payload.connectNeededInRelatonsIds } },
    })

    for (const connectNeededInWorker of connectNeededInWorkers)
      await this.prisma.worker.update({
        where: { id: connectNeededInWorker.id },
        data: {
          deviceId: payload.idToConnect,
        },
      })
  }

  @EventPattern(DeviceExternalTopic.Device_workersIds_disconnectMany)
  async deviceWorkersIdsDisconnectMany(@Payload() payload: FederationModelDisconnectManyPayload) {
    const disconnectNeededInWorkers = await this.prisma.worker.findMany({
      where: { id: { in: payload.disconnectNeededInRelationsIds } },
    })

    for (const disconnectNeededInWorker of disconnectNeededInWorkers)
      await this.prisma.worker.update({
        where: { id: disconnectNeededInWorker.id },
        data: {
          deviceId: null,
        },
      })
  }
}
