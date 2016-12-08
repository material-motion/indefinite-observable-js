import { Observable, Observer, ObserverOrNext, Subscription } from './types';
export default class IndefiniteSubject<T> implements Observable<T>, Observer<T> {
    _observers: Set<Observer<T>>;
    _lastValue: T;
    _hasStarted: boolean;
    next(value: T): void;
    subscribe(observerOrNext: ObserverOrNext<T>): Subscription;
}
