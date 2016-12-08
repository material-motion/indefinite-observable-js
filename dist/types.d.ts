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
    subscribe(listener: Observer | Next): Subscription;
}
export interface Observer {
    next: Next;
}
export declare type Creator = (observer: Observer) => Unsubscribe;
export declare type Next = (value: any) => void;
export declare type Listener = Observer | Next;
export declare type Unsubscribe = () => void;
export interface Subscription {
    unsubscribe: Unsubscribe;
}
