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

export interface Observable<T> {
  subscribe(listener: Observer<T> | Channel<T>): Subscription;
}

export interface Observer<T> {
  next: Channel<any>,
}

export type Creator<T> = (observer: Observer<T>) => Unsubscribe;

export type Channel<T> = (value: T) => void;
export type Listener<T> = Observer<T> | Channel<T>;

export type Unsubscribe = () => void;
export interface Subscription {
  unsubscribe: Unsubscribe,
}
