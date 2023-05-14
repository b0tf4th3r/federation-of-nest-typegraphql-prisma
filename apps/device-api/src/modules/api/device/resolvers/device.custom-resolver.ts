import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql'

import { Device } from '../../../../../__generated__/typegraphql-prisma'
import { Worker } from '../../../../models/externals/federation-worker-api'
import { Context } from '../../../app.module'

@Resolver(() => Device)
export class DeviceCustomResolver {
  constructor() {}

  @FieldResolver(() => [Worker])
  async workers(@Root() device: Device, @Ctx() { prisma }: Context): Promise<Partial<Worker>[]> {
    const foundDevice = await prisma.device.findUnique({ where: { id: device.id } })

    if (!foundDevice) throw new Error()

    return foundDevice.workersIds.map((workerId) => ({
      __typename: 'Worker',
      id: workerId,
    }))
  }
}
