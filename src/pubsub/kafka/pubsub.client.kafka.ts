import { Injectable } from '@nestjs/common';
import { Kafka, Producer, logLevel } from 'kafkajs';
import { v4 as Uuid} from 'uuid';

import { MessageSubscribed } from '../message.subscribed';
import { MessageProcessor } from '../message.processor';
import { Sbuscriber } from '../subscriber';
import { SubscriberKafka } from './subscriber.kafka';
import { PubSubClient } from '../pubsub.client';
import { ClientConfig } from '../client.config';


@Injectable()
export class PubSubClientKafka implements PubSubClient {
    // protected _brokers = ['localhost:9092'];
    protected _producer: Producer;

    constructor(private config: ClientConfig){
        this.initProducer();
    }

    private async initProducer() {
        const postfix_id = Uuid().toString();
        const connConfig = new Kafka({
            clientId: `${this.config.clientName}-${postfix_id}`,
            brokers: this.config.brokers,
            logLevel: logLevel.DEBUG,
        });
        this._producer = connConfig.producer();
        await this._producer.connect();
    }

    public async produceMessage(topic: string, message: MessageSubscribed): Promise<boolean>{
        const recordMeta = await this._producer.send({
                        topic: topic,
                        messages:[message],
                        acks: -1,
                        timeout: this.config.timeout,
                    });
        
        return recordMeta[0].errorCode == 0;
    }

    public async startConsumeMessage(topic: string, group: string, msgCallback: MessageProcessor): Promise<Sbuscriber>{
        const postfix_id = Uuid().toString();
        const connConfig = new Kafka({
            clientId: `${this.config.subscriberName}-${postfix_id}`,
            brokers: this.config.brokers,
        });

        const consumer = connConfig.consumer({
            groupId: group,
            retry: {retries: 3}
        });

        await consumer.connect();
        await consumer.subscribe({topic: topic, fromBeginning: false});
        
        await consumer.run({
                    autoCommit: true,
                    eachMessage: async ({topic, partition, message}) => {
                        let msgUnify: MessageSubscribed;
                        msgUnify.key = message.key?  message.key.toString() : null;
                        msgUnify.value = message.value.toString();
                        msgUnify.properties = {};
                        msgUnify.timestamp = message.timestamp;

                        for(const key in message.headers){
                            msgUnify.properties[key] = message.headers[key].toString();
                        }

                        msgCallback(msgUnify);
                    },
                });

        return new SubscriberKafka(consumer, topic);
    }

}