import { MessageSubscribed } from "./message.subscribed";
import { Sbuscriber } from "./subscriber";
import { MessageProcessor } from "./message.processor";

export interface PubSubClient {
    produceMessage(topic: string, message: MessageSubscribed): Promise<boolean>;
    startConsumeMessage(topic: string, group: string, msgCallback: MessageProcessor): Promise<Sbuscriber>;

}