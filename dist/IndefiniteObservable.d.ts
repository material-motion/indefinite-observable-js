import { Connect, Observable, ObserverOrNext, Subscription } from './types';
export default class IndefiniteObservable<T> implements Observable<T> {
    _connect: Connect<T>;
    constructor(connect: Connect<T>);
    subscribe(observerOrNext: ObserverOrNext<T>): Subscription;
}
