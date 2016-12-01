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

export default class IndefiniteObservable {
  _listeners = new Set();

  constructor({ start, stop }) {
    this._start = start;
    this._stop = stop;
  }

  subscribe(listener) {
    const listeners = this._listeners;
    const stop = this._stop;

    listeners.add(listener);

    if (listeners.size === 1) {
      this._start(
        this._dispatch.bind(this)
      );
    }

    return {
      unsubscribe() {
        listeners.delete(listener);

        if (listeners.size === 0 && stop) {
          stop();
        }
      }
    }
  }

  _dispatch(value) {
    this._listeners.forEach(
      listener => listener(value)
    );
  }
}
