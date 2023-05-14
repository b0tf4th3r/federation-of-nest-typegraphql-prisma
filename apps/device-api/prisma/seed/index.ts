import { PrismaClient } from '@prisma/client'

import { handleDeviceAndSpecifications } from './devices-and-specifications'

const seed = async () => {
  const prisma = new PrismaClient()

  await handleDeviceAndSpecifications({ prisma })
}

seed()
