/** @license
 *  Copyright 2016 - present The Material Motion Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import $$observable from 'symbol-observable';

import wrapWithObserver from './wrapWithObserver';

import {
  Channel,
  Observable,
  Observer,
  ObserverOrNext,
  Subscription,
  Unsubscribe,
} from './types';

export default class IndefiniteSubject<T> implements Observable<T>, Observer<T> {
  // Keep track of all the observers who have subscribed, so we can notify them
  // when we get new values.
  _observers: Set<Observer<T>> = new Set();
  _lastValue: T;
  _hasStarted: boolean = false;

  next(value: T) {
    this._hasStarted = true;
    this._lastValue = value;

    // The parent stream has dispatched a value, so pass it along to all the
    // children, and cache it for any observers that subscribe before the next
    // dispatch.
    this._observers.forEach(
      (observer: Observer<T>) => observer.next(value)
    );
  }

  subscribe(observerOrNext: ObserverOrNext<T>): Subscription {
    const observer = wrapWithObserver<T>(observerOrNext);

    this._observers.add(observer);

    if (this._hasStarted) {
      observer.next(this._lastValue);
    }

    return {
      unsubscribe: () => {
        this._observers.delete(observer);
      }
    }
  }

  /**
   * Tells other libraries that know about observables that we are one.
   *
   * https://github.com/tc39/proposal-observable#observable
   */
  [$$observable](): Observable<T> {
    return this;
  }
}
