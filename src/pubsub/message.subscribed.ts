export interface MessageSubscribed {
    key?: string;
    value: string;
    properties?: { [key: string]: string};
    timestamp?: string
}