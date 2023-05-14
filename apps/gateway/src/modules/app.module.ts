import { IntrospectAndCompose } from '@apollo/gateway'
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import 'reflect-metadata'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: true,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: process.env.DEVICE_API_APP_NAME || "", url: `http://localhost:${process.env.DEVICE_API_APP_PORT}/graphql` },
            { name: process.env.WORKER_API_APP_NAME || "", url: `http://localhost:${process.env.WORKER_API_APP_PORT}/graphql` },
          ],
        }),
      },
    }),
  ],
})
export default class AppModule {}
