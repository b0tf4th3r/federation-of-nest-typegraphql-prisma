import { PrismaClient } from '@prisma/client'

export const handleDeviceAndSpecifications = async (input: { prisma: PrismaClient }) => {
  const clockSpeedOfCPUItems = [3.4, 3.6, 3.8, 4.2]
  const gigabytesOfRamItems = [4, 8, 16, 32]
  const gigabytesOfVRamItems = [0, 2, 4, 8]
  const numberOfCPUCoresItems = [2, 4, 6, 16, 24, 32]

  for (let i = 1; i < 11; i++)
    await input.prisma.device.create({
      data: {
        name: 'PC' + i,
        specification: {
          create: {
            clockSpeedOfCPU:
              clockSpeedOfCPUItems[Math.floor(Math.random() * clockSpeedOfCPUItems.length)],
            gigabytesOfRam:
              gigabytesOfRamItems[Math.floor(Math.random() * gigabytesOfRamItems.length)],
            gigabytesOfVRam:
              gigabytesOfVRamItems[Math.floor(Math.random() * gigabytesOfVRamItems.length)],
            numberOfCPUCores:
              numberOfCPUCoresItems[Math.floor(Math.random() * numberOfCPUCoresItems.length)],
          },
        },
        workersIds: [i],
      },
    })
}
