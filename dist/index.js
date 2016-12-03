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
class IndefiniteObservable {
    constructor(creator) {
        this._creator = creator;
    }
    subscribe(listener) {
        if (!listener.next) {
            listener = {
                next: listener,
            };
        }
        let unsubscribe = this._creator(listener);
        return { unsubscribe };
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IndefiniteObservable;
//# sourceMappingURL=index.js.map