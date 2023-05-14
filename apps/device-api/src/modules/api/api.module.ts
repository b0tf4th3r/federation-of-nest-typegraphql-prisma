import { Module } from '@nestjs/common'

import { DeviceSpecificationModule } from './device-specification/device-specification.module'
import { DeviceModule } from './device/device.module'

const modules = [DeviceModule, DeviceSpecificationModule]

@Module({
  imports: modules,
  providers: [],
  exports: modules,
})
export class ApiModule {}
