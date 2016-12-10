import { Observable, Observer, ObserverOrNext, Subscription } from './types';
/**
 * An IndefiniteSubject is both an Observer and an Observable.  Whenever it
 * receives a value on `next`, it forwards that value to any subscribed
 * observers.
 *
 * IndefiniteSubject is a multicast Observable; it remembers the most recent
 * value dispatched and passes it to any new subscriber.
 */
export default class IndefiniteSubject<T> implements Observable<T>, Observer<T> {
    _observers: Set<Observer<T>>;
    _lastValue: T;
    _hasStarted: boolean;
    /**
     * Passes the supplied value to any currently-subscribed observers.  If an
     * observer `subscribe`s before `next` is called again, it will immediately
     * receive `value`.
     */
    next(value: T): void;
    /**
     * `subscribe` accepts either a function or an object with a next method.
     * `subject.next` will forward any value it receives to the function or method
     * provided here.
     *
     * Call the returned `unsubscribe` method to stop receiving values on this
     * particular observer.
     */
    subscribe(observerOrNext: ObserverOrNext<T>): Subscription;
}
