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

export default class IndefiniteObservable<T> {
  _creator: Creator;

  constructor(creator: Creator) {
    this._creator = creator;
  }

  subscribe(listener: Listener): Subscription {
    // subscribe accepts next as either an anonymous function or as a named
    // member on an object.  The creator always expects an object with a
    // function named next.  Therefore, if we receive an anonymous function, we
    // wrap it in an object literal.

    if (!(listener as Observer).next) {
      listener = {
        next: (listener as Next),
      };
    }

    let unsubscribe: Unsubscribe = this._creator(listener as Observer);

    return {
      unsubscribe,
    };
  }

  /**
   * Tells other libraries that know about observables that we are one.
   *
   * https://github.com/tc39/proposal-observable#observable
   */
  [$$observable](): IndefiniteObservable<T> {
    return this;
  }
}


// Hey look: types!  Don't be afraid.  They won't bite.

export type Creator = (observer: Observer) => Unsubscribe;
export type Observer = {
  next: Next,
}
export type Next = (value: any) => void;
export type Listener = Observer | Next;

export type Unsubscribe = () => void;
export type Subscription = {
  unsubscribe: Unsubscribe,
}
