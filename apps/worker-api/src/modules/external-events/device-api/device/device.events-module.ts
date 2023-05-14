import { Module } from '@nestjs/common'

import { PrismaModule } from '../../../prisma/prisma.module'
import { DeviceDeviceApiExternalEventsController } from './device.events-controller'

@Module({
  imports: [PrismaModule],
  controllers: [DeviceDeviceApiExternalEventsController],
  providers: [DeviceDeviceApiExternalEventsController],
  exports: [DeviceDeviceApiExternalEventsController],
})
export class DeviceDeviceApiExternalEventsModule {}
