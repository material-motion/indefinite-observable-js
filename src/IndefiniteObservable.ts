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
  Connect,
  Observable,
  ObserverOrNext,
  Subscription,
} from './types';

export default class IndefiniteObservable<T> implements Observable<T> {
  _connect: Connect<T>;

  constructor(connect: Connect<T>) {
    this._connect = connect;
  }

  subscribe(observerOrNext: ObserverOrNext<T>): Subscription {
     // For simplicity's sake, `subscribe` accepts `next` either as either an
     // anonymous function or wrapped in an object (the observer).  Since
     // `connect` always expects to receive an observer, wrap any loose
     // functions in an object.

    const observer = wrapWithObserver<T>(observerOrNext);

    const disconnect = this._connect(observer);

    return {
      unsubscribe: disconnect,
    };
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
