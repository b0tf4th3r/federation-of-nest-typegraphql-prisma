import { Module } from '@nestjs/common'

import { DeviceDeviceApiExternalEventsModule } from './device-api/device/device.events-module'

const modules = [DeviceDeviceApiExternalEventsModule]

@Module({
  imports: modules,
  providers: [],
  exports: modules,
})
export class ExternalEventsModule {}
