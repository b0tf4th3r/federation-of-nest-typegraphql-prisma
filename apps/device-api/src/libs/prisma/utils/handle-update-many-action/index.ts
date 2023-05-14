import { FederationModel } from '../../../../types'
import { kafka } from '../../../kafka'
import { DataInput, FindManyInput } from '../../types/index.types'
import { HandleUpdateManyActionInput } from './types/index.types'

export const handleUpdateManyAction = async (
  handleUpdateManyActionInput: HandleUpdateManyActionInput
) => {
  const updateArgs: FindManyInput & DataInput = handleUpdateManyActionInput.args

  const modelsBeforeUpdate = await handleUpdateManyActionInput.prismaClient[
    handleUpdateManyActionInput.modelName
  ].findMany({
    where: updateArgs.where,
  })

  const connectedRelationsToUpdate: FederationModel['connectedRelations'] = []

  for (let [key, _] of Object.entries(updateArgs.data)) {
    const foundConnectedRelationToUpdate =
      handleUpdateManyActionInput.federationModel.connectedRelations.find(
        (connectedRelation) => connectedRelation.fieldName === key
      )

    if (foundConnectedRelationToUpdate)
      connectedRelationsToUpdate.push(foundConnectedRelationToUpdate)
  }

  for (const modelBeforeUpdate of modelsBeforeUpdate)
    for (const connectedRelationToUpdate of connectedRelationsToUpdate) {
      const topicPrefix =
        handleUpdateManyActionInput.model + '_' + connectedRelationToUpdate.fieldName
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
