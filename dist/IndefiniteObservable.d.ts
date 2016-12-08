import { Creator, Observable, ObserverOrNext, Subscription } from './types';
export default class IndefiniteObservable<T> implements Observable<T> {
    _creator: Creator<T>;
    constructor(creator: Creator<T>);
    subscribe(observerOrNext: ObserverOrNext<T>): Subscription;
}
