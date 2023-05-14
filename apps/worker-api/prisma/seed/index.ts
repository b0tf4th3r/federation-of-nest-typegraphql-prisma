import { PrismaClient } from '@prisma/client'

import { handleWorkersAndNestedRelations } from './workers-and-nested-relations'

const seed = async () => {
  const prisma = new PrismaClient()

  await handleWorkersAndNestedRelations({ prisma })
}

seed()
