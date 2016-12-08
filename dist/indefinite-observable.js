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
"use strict";


/** @license for symbol-observable:
 * The MIT License (MIT)
 *
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
 * Copyright (c) Ben Lesh <ben@benlesh.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var $observable = (
  () => {
    var root;

    if (typeof self !== 'undefined') {
      root = self;
    } else if (typeof window !== 'undefined') {
      root = window;
    } else if (typeof global !== 'undefined') {
      root = global;
    } else if (typeof module !== 'undefined') {
      root = module;
    } else {
      root = Function('return this')();
    }

    var Symbol = root.Symbol;

    if (typeof Symbol === 'function') {
      if (Symbol.observable) {
        result = Symbol.observable;
      } else {
        result = Symbol('observable');
        Symbol.observable = result;
      }
    } else {
      result = '@@observable';
    }

    return result;
  }
)();

class IndefiniteObservable {
    constructor(creator) {
        this._creator = creator;
    }
    subscribe(observerOrNext) {
        const observer = wrapWithObserver(observerOrNext);
        let unsubscribe = this._creator(observer);
        return {
            unsubscribe,
        };
    }
    /**
     * Tells other libraries that know about observables that we are one.
     *
     * https://github.com/tc39/proposal-observable#observable
     */
    [$observable]() {
        return this;
    }
}

class IndefiniteSubject {
    constructor() {
        this._observers = new Set();
        this._hasStarted = false;
    }
    next(value) {
        this._hasStarted = true;
        this._lastValue = value;
        this._observers.forEach((observer) => observer.next(value));
    }
    subscribe(observerOrNext) {
        const observer = wrapWithObserver(observerOrNext);
        this._observers.add(observer);
        if (this._hasStarted) {
            observer.next(this._lastValue);
        }
        return {
            unsubscribe: () => {
                this._observers.delete(observer);
            }
        };
    }
    /**
     * Tells other libraries that know about observables that we are one.
     *
     * https://github.com/tc39/proposal-observable#observable
     */
    [$observable]() {
        return this;
    }
}

function wrapWithObserver(listener) {
    if (listener.next) {
        return listener;
    }
    else {
        return {
            next: listener
        };
    }
}

