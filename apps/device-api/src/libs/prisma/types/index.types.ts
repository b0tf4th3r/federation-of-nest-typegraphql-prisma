import { FederationModel } from '../../../types'

export type FindManyInput = {
  where: { id: { in: number[] } }
}

export type FindOneInput = {
  where: { id: number }
}

export type DataInput = {
  data: any
}

export type HandleActionInput = {
  args: any
  prismaClient: any
  model: any
  modelName: string
  federationModel: FederationModel
}
