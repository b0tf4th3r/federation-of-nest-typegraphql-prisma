export type FederationModel = {
  name: string
  connectedRelations: {
    fieldName: string
    relationType: FederationModelConnectedRelationType
  }[]
}

export type FederationModelConnectedRelationType = 'One' | 'Many'
