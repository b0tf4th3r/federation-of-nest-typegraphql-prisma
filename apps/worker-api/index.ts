import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import 'reflect-metadata'

import { AppModule } from './src/modules/app.module'

async function main() {
  if (!process.env.WORKER_API_APP_PORT || !process.env.WORKER_API_APP_NAME) throw new Error()

  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter())

  await app.listen(process.env.WORKER_API_APP_PORT)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      consumer: {
        groupId: process.env.WORKER_API_APP_NAME + '-consumer',
      },
      client: {
        clientId: process.env.WORKER_API_APP_NAME,
        brokers: ['kafka:' + process.env.KAFKA_BROKER_PORT],
      },
    },
  })

  app.startAllMicroservices().then(() => {
    console.log(`🔥 [${process.env.WORKER_API_APP_NAME}] App running!`)
  })
}

main().catch(console.error)
