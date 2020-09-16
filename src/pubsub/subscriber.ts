export interface Sbuscriber{
    Topic(): string;
    Type(): string;
    ActualConsumer(): any;    
    disconnect(): boolean;
    pause(): boolean;
    resum(): boolean;
    stop(): boolean;

}