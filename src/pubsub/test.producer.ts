import { PubSubClientKafka } from './kafka/pubsub.client.kafka'
import { MessageSubscribed } from './message.subscribed'

const config = {
    brokers: ['localhost:9092'],
    clientName: 'consumer_1',
    subscriberName: 'consumer_1',
    timeout: 10000,
}
const topic = 'event.test_event';
const client = new PubSubClientKafka(config);


const msg: MessageSubscribed = {value:''};
msg.value = JSON.stringify({id: 1000});

export function testRunner(): void {
    const result = client.produceMessage(topic, msg);
}
