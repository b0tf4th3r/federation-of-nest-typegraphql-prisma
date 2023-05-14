import { Module } from '@nestjs/common'

import {
  DeviceCrudResolver,
  DeviceRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [
  ],
  providers: [DeviceCrudResolver, DeviceRelationsResolver],
  exports: [DeviceCrudResolver, DeviceRelationsResolver],
})
export class DeviceModule {}
