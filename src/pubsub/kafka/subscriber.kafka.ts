import { Consumer } from 'kafkajs';
import { Sbuscriber } from '../subscriber';

export class SubscriberKafka implements Sbuscriber{
    private _consumer: Consumer;
    private _topic: string;

    constructor(consumerInstance: Consumer, topic: string){
        this._consumer = consumerInstance;
        this._topic = topic;
    }
    Topic(): string {
        return this._topic;
    }
    pause(): boolean {
        let result = false;
        try{
            this._consumer.pause([{topic: this._topic}]);
            result = true;
        }
        catch(err){
            result = false;
        }

        return result;
    }
    Type(): string {
        return 'kafkajs.Consumer';
    }
    ActualConsumer(): any {
        return this._consumer;
    }
    stop(): boolean {
        this._consumer.stop();
        return true;
    }
    resum(): boolean {
        let result = false;

        try{
            this._consumer.resume([{topic: this._topic}]);
            result = true;
        }
        catch(err){
            result = false;
        }

        return result;
    }
    disconnect(): boolean {
        this._consumer.disconnect();
        return true;
    }





}