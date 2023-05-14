import { FederationModel } from '../../../../types'
import { kafka } from '../../../kafka'
import { DataInput, FindOneInput } from '../../types/index.types'
import { HandleUpdateActionInput } from './types/index.types'

export const handleUpdateAction = async (handleUpdateActionInput: HandleUpdateActionInput) => {
  const updateArgs: FindOneInput & DataInput = handleUpdateActionInput.args

  const modelBeforeUpdate = await handleUpdateActionInput.prismaClient[
    handleUpdateActionInput.modelName
  ].findUnique({
    where: updateArgs.where,
  })

  const connectedRelationsToUpdate: FederationModel['connectedRelations'] = []

  for (let [key, _] of Object.entries(updateArgs.data)) {
    const foundConnectedRelationToUpdate =
      handleUpdateActionInput.federationModel.connectedRelations.find(
        (connectedRelation) => connectedRelation.fieldName === key
      )

    if (foundConnectedRelationToUpdate)
      connectedRelationsToUpdate.push(foundConnectedRelationToUpdate)
  }

  for (const connectedRelationToUpdate of connectedRelationsToUpdate) {
    const topicPrefix = handleUpdateActionInput.model + '_' + connectedRelationToUpdate.fieldName
    const disconnectTopic = topicPrefix + '_disconnect' + connectedRelationToUpdate.relationType
    const connectTopic = topicPrefix + '_connect' + connectedRelationToUpdate.relationType

    if (connectedRelationToUpdate.relationType === 'One') {
      kafka.emit(disconnectTopic, {
        disconnectNeededInRelationId: modelBeforeUpdate[connectedRelationToUpdate.fieldName],
        idToDisconnect: updateArgs.where.id,
      })

      kafka.emit(connectTopic, {
        connectNeededInRelatonId: updateArgs.data[connectedRelationToUpdate.fieldName],
        idToConnect: updateArgs.where.id,
      })
    }

    if (connectedRelationToUpdate.relationType === 'Many') {
      kafka.emit(disconnectTopic, {
        disconnectNeededInRelationsIds: modelBeforeUpdate[
          connectedRelationToUpdate.fieldName
        ].filter(
          (id: number) => !updateArgs.data[connectedRelationToUpdate.fieldName].includes(id)
        ),
        idToDisconnect: updateArgs.where.id,
      })

      kafka.emit(connectTopic, {
        connectNeededInRelatonsIds: updateArgs.data[connectedRelationToUpdate.fieldName],
        idToConnect: updateArgs.where.id,
      })
    }
  }
}
