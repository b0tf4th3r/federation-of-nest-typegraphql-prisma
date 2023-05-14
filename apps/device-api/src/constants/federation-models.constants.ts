import { FederationModel } from '../types'

export const federationModels: FederationModel[] = [
  {
    name: 'Device',
    connectedRelations: [
      {
        fieldName: 'workersIds',
        relationType: 'Many',
      },
    ],
  },
]
