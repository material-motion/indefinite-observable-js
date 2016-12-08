import { Observable, Creator, Listener, Subscription } from './types';
export default class IndefiniteObservable<T> implements Observable<T> {
    _creator: Creator;
    constructor(creator: Creator);
    subscribe(listener: Listener): Subscription;
}
