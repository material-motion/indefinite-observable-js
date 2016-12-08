import { Creator, Listener, Observable, Subscription } from './types';
export default class IndefiniteObservable<T> implements Observable<T> {
    _creator: Creator<T>;
    constructor(creator: Creator<T>);
    subscribe(listener: Listener<T>): Subscription;
}
