import { PubSubClientKafka } from './kafka/pubsub.client.kafka'
import { MessageSubscribed } from './message.subscribed'
import { Sbuscriber } from './subscriber';

const config = {
    brokers: ['localhost:9092'],
    clientName: 'consumer_1',
    subscriberName: 'consumer_1',
    timeout: 10000,
}
const topic = 'event.test_event';
const group = 'msg-group-1';
const client = new PubSubClientKafka(config);


function msgProcessor(msg: MessageSubscribed){
    console.log(msg.value);
}


async function consumeMsg(): Promise<Sbuscriber>{
    return await client.startConsumeMessage(topic, group, msgProcessor);
}


consumeMsg().then((consumer) => {
    console.log(`consumer(${consumer?.Type()}) is running..`);
})

export function testRunner(): void {
    consumeMsg();
}

