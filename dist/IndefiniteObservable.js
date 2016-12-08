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
const symbol_observable_1 = require("symbol-observable");
const wrapWithObserver_1 = require("./wrapWithObserver");
class IndefiniteObservable {
    constructor(creator) {
        this._creator = creator;
    }
    subscribe(observerOrNext) {
        // subscribe accepts next as either an anonymous function or as a named
        // member on an object.  The creator always expects an object with a
        // function named next.  Therefore, if we receive an anonymous function, we
        // wrap it in an object literal.
        const observer = wrapWithObserver_1.default(observerOrNext);
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
    [symbol_observable_1.default]() {
        return this;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IndefiniteObservable;
//# sourceMappingURL=IndefiniteObservable.js.map