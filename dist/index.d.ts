export default class IndefiniteObservable<T> {
    _creator: Creator;
    constructor(creator: Creator);
    subscribe(listener: Listener): Subscription;
}
export declare type Creator = (observer: Observer) => Unsubscribe;
export declare type Observer = {
    next: Next;
};
export declare type Next = (value: any) => void;
export declare type Listener = Observer | Next;
export declare type Unsubscribe = () => void;
export declare type Subscription = {
    unsubscribe: Unsubscribe;
};