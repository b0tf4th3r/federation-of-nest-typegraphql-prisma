import { FederationModel } from '../../../../types'
import { kafka } from '../../../kafka'
import { DataInput } from '../../types/index.types'
import { HandleCreateActionInput } from './types/index.types'

export const handleCreateAction = async (handleCreateActionInput: HandleCreateActionInput) => {
  const createArgs: DataInput = handleCreateActionInput.args

  const connectedRelationsToUpdate: FederationModel['connectedRelations'] = []

  for (let [key, _] of Object.entries(createArgs.data)) {
    const foundConnectedRelationToUpdate =
      handleCreateActionInput.federationModel.connectedRelations.find(
        (connectedRelation) => connectedRelation.fieldName === key
      )

    if (foundConnectedRelationToUpdate)
      connectedRelationsToUpdate.push(foundConnectedRelationToUpdate)
  }

  for (const federationFieldToUpdate of connectedRelationsToUpdate) {
    const topicPrefix = handleCreateActionInput.model + '_' + federationFieldToUpdate.fieldName
    const connectTopic = topicPrefix + '_connect' + federationFieldToUpdate.relationType

    if (federationFieldToUpdate.relationType === 'One')
      kafka.emit(connectTopic, {
        connectNeededInRelatonId: createArgs.data[federationFieldToUpdate.fieldName],
        idToConnect: handleCreateActionInput.result.id,
      })

    if (federationFieldToUpdate.relationType === 'Many')
      kafka.emit(connectTopic, {
        connectNeededInRelatonsIds: createArgs.data[federationFieldToUpdate.fieldName].set,
        idToConnect: handleCreateActionInput.result.id,
      })
  }
}
