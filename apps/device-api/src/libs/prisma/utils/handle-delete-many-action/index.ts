import { kafka } from '../../../kafka'
import { FindManyInput } from '../../types/index.types'
import { HandleDeleteManyActionInput } from './types/index.types'

export const handleDeleteManyAction = async (
  handleDeleteManyActionInput: HandleDeleteManyActionInput
) => {
  const findArgs: FindManyInput = handleDeleteManyActionInput.args

  const modelsBeforeDelete = await handleDeleteManyActionInput.prismaClient[
    handleDeleteManyActionInput.modelName
  ].findMany({
    ...findArgs,
  })

  for (const modelBeforeDelete of modelsBeforeDelete)
    for (const connectedRelation of handleDeleteManyActionInput.federationModel
      .connectedRelations) {
      const topicPrefix = handleDeleteManyActionInput.model + '_' + connectedRelation.fieldName
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
