import { ClientKafka } from '@nestjs/microservices'

const kafkaClient = new ClientKafka({
  client: {
    clientId: process.env.DEVICE_API_APP_NAME,
    brokers: ['kafka:' + process.env.KAFKA_BROKER_PORT],
  },
})

const main = async () => {
  await kafkaClient.connect()
}

main()

export const kafka = kafkaClient
