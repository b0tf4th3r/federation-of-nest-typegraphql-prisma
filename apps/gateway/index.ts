import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import 'reflect-metadata'
import AppModule from './src/modules/app.module'

async function main() {
  if (!process.env.GATEWAY_APP_PORT) throw new Error()

  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter())

  await app.listen(process.env.GATEWAY_APP_PORT)
}

main().catch(console.error)
