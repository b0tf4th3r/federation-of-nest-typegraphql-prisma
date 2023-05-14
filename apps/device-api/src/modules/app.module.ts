import { ApolloFederationDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { TypeGraphQLModule } from 'typegraphql-nestjs'

import { prisma } from '../libs/prisma'
import { ApiModule } from './api/api.module'
import { ExternalEventsModule } from './external-events/external-events.module'

export interface Context {
  prisma: PrismaClient
}

@Module({
  imports: [
    TypeGraphQLModule.forRoot({
      emitSchemaFile: './generated-schema.graphql',
      driver: ApolloFederationDriver,
      federationVersion: 2,
      validate: false,
      skipCheck: true,
      context: (): Context => ({ prisma }),
    }),
    ApiModule,
    ExternalEventsModule
  ],
  providers: [],
})
export class AppModule {}
