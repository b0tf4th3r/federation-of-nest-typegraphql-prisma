import { kafka } from '../../../kafka'
import { FindOneInput } from '../../types/index.types'
import { HandleDeleteActionInput } from './types/index.types'

export const handleDeleteAction = async (handleDeleteActionInput: HandleDeleteActionInput) => {
  const findArgs: FindOneInput = handleDeleteActionInput.args

  const modelBeforeDelete = await handleDeleteActionInput.prismaClient[
    handleDeleteActionInput.modelName
  ].findUnique({
    where: findArgs.where,
  })

  for (const connectedRelation of handleDeleteActionInput.federationModel.connectedRelations) {
    const topicPrefix = handleDeleteActionInput.model + '_' + connectedRelation.fieldName
    const disconnectTopic = topicPrefix + '_disconnect' + connectedRelation.relationType

    if (connectedRelation.relationType === 'One')
      kafka.emit(disconnectTopic, {
        disconnectNeededInRelationId: modelBeforeDelete[connectedRelation.fieldName],
        idToDisconnect: findArgs.where.id,
      })

    if (connectedRelation.relationType === 'Many')
      kafka.emit(disconnectTopic, {
        disconnectNeededInRelationsIds: modelBeforeDelete[connectedRelation.fieldName],
        idToDisconnect: findArgs.where.id,
      })
  }
}
