import { Module } from '@nestjs/common'
import { Directive } from 'type-graphql'
import { TypeGraphQLModule } from 'typegraphql-nestjs'

import {
  applyModelsEnhanceMap,
  ModelsEnhanceMap,
  WorkerCrudResolver,
  WorkerRelationsResolver,
} from '../../../../__generated__/typegraphql-prisma'
import { resolveWorkerReference } from './federation/worker.reference'
import { WorkerCustomResolver } from './resolvers/worker.custom-resolver'

export const modelEnhance: ModelsEnhanceMap = {
  Worker: {
    class: [Directive(`@key(fields: "id")`)],
  },
}

applyModelsEnhanceMap({
  ...modelEnhance,
})

@Module({
  imports: [
    TypeGraphQLModule.forFeature({
      referenceResolvers: {
        Worker: {
          __resolveReference: resolveWorkerReference,
        },
      },
    }),
  ],
  providers: [WorkerCrudResolver, WorkerRelationsResolver, WorkerCustomResolver],
  exports: [WorkerCrudResolver, WorkerRelationsResolver, WorkerCustomResolver],
})
export class WorkerModule {}
