import { Device } from '../../../../../__generated__/typegraphql-prisma'
import { Context } from '../../../app.module'

export async function resolveDeviceReference(
  reference: Pick<Device, 'id'>,
  { prisma }: Context
): Promise<Device | null> {
  return await prisma.device.findUnique({
    where: { id: reference.id },
  })
}
