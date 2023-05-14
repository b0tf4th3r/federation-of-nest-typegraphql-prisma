import { Worker } from '../../../../../__generated__/typegraphql-prisma'
import { Context } from '../../../app.module'

export async function resolveWorkerReference(
  reference: Pick<Worker, 'id'>,
  { prisma }: Context
): Promise<Worker | null> {
  return await prisma.worker.findUnique({
    where: { id: reference.id },
  })
}
