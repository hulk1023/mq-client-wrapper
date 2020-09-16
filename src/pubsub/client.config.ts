export interface ClientConfig {
    brokers: string[],
    clientName: string,
    subscriberName: string,
    timeout: number,
}