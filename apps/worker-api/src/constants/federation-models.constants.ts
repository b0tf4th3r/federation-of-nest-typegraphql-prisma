import { FederationModel } from '../types'

export const federationModels: FederationModel[] = [
  {
    name: 'Worker',
    connectedRelations: [
      {
        fieldName: 'deviceId',
        relationType: 'One',
      },
    ],
  },
]
