import { PrismaClient } from '@prisma/client'

import { federationModels } from '../../constants/federation-models.constants'
import {
  handleCreateAction,
  handleDeleteAction,
  handleDeleteManyAction,
  handleUpdateAction,
  handleUpdateManyAction,
} from './utils'

const prismaClient = new PrismaClient()

const main = async () => {
  prismaClient.$use(async ({ action, args, model, ...rest }, next) => {
    if (!model) throw new Error()

    const modelName = model[0].toLowerCase() + model.substring(1)
    const federationModel = federationModels.find(
      (federationModel) => federationModel.name === model
    )

    if (federationModel) {
      if (action === 'update')
        await handleUpdateAction({
          args,
          federationModel,
          model,
          modelName,
          prismaClient,
        })

      if (action === 'updateMany')
        await handleUpdateManyAction({
          args,
          federationModel,
          model,
          modelName,
          prismaClient,
        })

      if (action === 'delete')
        await handleDeleteAction({
          args,
          federationModel,
          model,
          modelName,
          prismaClient,
        })

      if (action === 'deleteMany')
        await handleDeleteManyAction({
          args,
          federationModel,
          model,
          modelName,
          prismaClient,
        })
    }

    const result = await next({ action, args, model, ...rest })

    if (federationModel)
      if (action === 'create')
        await handleCreateAction({
          args,
          federationModel,
          model,
          modelName,
          prismaClient,
          result,
        })

    return result
  })
}

main()

export const prisma = prismaClient
