export default class IndefiniteObservable<T> implements Observable<T> {
    _creator: Creator;
    constructor(creator: Creator);
    subscribe(listener: Listener): Subscription;
}
export interface Observable<T> {
    subscribe(listener: Observer | Next): Subscription;
}
export interface Observer {
    next: Next;
}
export declare type Creator = (observer: Observer) => Unsubscribe;
export declare type Next = (value: any) => void;
export declare type Listener = Observer | Next;
export declare type Unsubscribe = () => void;
export interface Subscription {
    unsubscribe: Unsubscribe;
}
