import { FieldResolver, Resolver, Root } from 'type-graphql'

import { Worker } from '../../../../../__generated__/typegraphql-prisma'
import { Device } from '../../../../models/external/device-api'

@Resolver(() => Worker)
export class WorkerCustomResolver {
  constructor() {}

  @FieldResolver(() => Device, { nullable: true })
  async device(@Root() worker: Worker): Promise<Device | null> {
    return worker.deviceId
      ? {
          id: worker.deviceId,
        }
      : null
  }
}
