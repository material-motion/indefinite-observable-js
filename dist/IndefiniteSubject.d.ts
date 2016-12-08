import { Listener, Observable, Observer, Subscription } from './types';
export default class IndefiniteSubject<T> implements Observable<T>, Observer<T> {
    _observers: Set<Observer<T>>;
    _lastValue: T;
    _hasStarted: boolean;
    next(value: T): void;
    subscribe(listener: Listener<T>): Subscription;
}
