import { MessageSubscribed } from './message.subscribed'


export interface MessageProcessor {
    (message: MessageSubscribed): void;
}