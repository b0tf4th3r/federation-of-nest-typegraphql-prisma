import { Module } from '@nestjs/common'
import { Directive } from 'type-graphql'
import { TypeGraphQLModule } from 'typegraphql-nestjs'

import {
  applyModelsEnhanceMap,
  DeviceCrudResolver,
  DeviceRelationsResolver,
  ModelsEnhanceMap,
} from '../../../../__generated__/typegraphql-prisma'
import { resolveDeviceReference } from './federation/device.reference'
import { DeviceCustomResolver } from './resolvers/device.custom-resolver'

export const modelEnhance: ModelsEnhanceMap = {
  Device: {
    class: [Directive(`@key(fields: "id")`)],
  },
}

applyModelsEnhanceMap({
  ...modelEnhance,
})

@Module({
  imports: [
    TypeGraphQLModule.forFeature({
      referenceResolvers: {
        Device: {
          __resolveReference: resolveDeviceReference,
        },
      },
    }),
  ],
  providers: [DeviceCrudResolver, DeviceRelationsResolver, DeviceCustomResolver],
  exports: [DeviceCrudResolver, DeviceRelationsResolver, DeviceCustomResolver],
})
export class DeviceModule {}
