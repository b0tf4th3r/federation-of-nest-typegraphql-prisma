import { Module } from '@nestjs/common'

import {
  DeviceSpecificationCrudResolver,
  DeviceSpecificationRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'

@Module({
  imports: [],
  providers: [DeviceSpecificationCrudResolver, DeviceSpecificationRelationsResolver],
  exports: [DeviceSpecificationCrudResolver, DeviceSpecificationRelationsResolver],
})
export class DeviceSpecificationModule {}
