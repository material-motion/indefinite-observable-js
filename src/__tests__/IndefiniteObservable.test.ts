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

import { expect } from 'chai';

import {
  beforeEach,
  describe,
  it,
} from 'mocha-sugar-free';

import {
  stub,
} from 'sinon';

import IndefiniteObservable from '../IndefiniteObservable';

declare function require(name: string);

// chai really doesn't like being imported as an ES2015 module; will be fixed in v4
require('chai').use(
  require('sinon-chai')
);

describe('IndefiniteObservable',
  () => {
    let next;
    let stream;
    let listener1;
    let listener2;
    let disconnect;

    beforeEach(
      () => {
        stream = new IndefiniteObservable(
          observer => {
            next = (value) => {
              observer.next(value);
            }

            return disconnect;
          }
        );

        listener1 = stub();
        listener2 = stub();
        disconnect = stub();
      }
    );

    it(`should not call a subscriber until next has been called`,
      () => {
        stream.subscribe(listener1);
        expect(listener1).not.to.have.been.called;
      }
    );

    it(`should forward values from connect to a subscriber`,
      () => {
        stream.subscribe(listener1);

        next(2);

        expect(listener1).to.have.been.calledWith(2);

        next(3);

        expect(listener1).to.have.been.calledWith(3);
      }
    );

    it(`should connect each subscriber independently`,
      () => {
        let connect = stub().returns(disconnect);

        let spiedStream = new IndefiniteObservable(connect);

        spiedStream.subscribe(listener1);
        spiedStream.subscribe(listener2);

        expect(connect).to.have.been.calledTwice;
      }
    );

    // This is the test that led to https://github.com/material-motion/indefinite-observable-js/commit/26a7963a3e353e9ff83ea7b26a8beed46ad6e15d
    it(`should send values to each subscriber independently`,
      () => {
        let counter = 0;

        const random$ = new IndefiniteObservable(
          (observer) => {
            counter++;
            observer.next(counter);

            return disconnect;
          }
        );

        random$.subscribe(listener1);
        random$.subscribe(listener2);

        const value1 = listener1.lastCall.args[0];
        const value2 = listener2.lastCall.args[0];

        expect(listener1).to.have.been.called;
        expect(listener2).to.have.been.called;
        expect(value1).not.to.equal(value2);
      }
    );

    it(`should disconnect observers from events when unsubscribe is called`,
      () => {
        const subscription = stream.subscribe(listener1);
        subscription.unsubscribe();

        expect(disconnect).to.have.been.calledOnce;
      }
    );

    it(`doesn't forward unsubscribe arguments to disconnect`,
      () => {
        const subscription = stream.subscribe(listener1);
        (subscription.unsubscribe as any)(1);

        expect(disconnect).to.have.been.calledOnce;
        expect(disconnect).not.to.have.been.calledWith(1);
      }
    );

    it(`should only allow each subscription to be unsubscribed once`,
      () => {
        const subscription = stream.subscribe(listener1);
        subscription.unsubscribe();
        subscription.unsubscribe();

        expect(disconnect).to.have.been.calledOnce;
      }
    );

    it(`should accept an observer or an anonymous function`,
      () => {
        stream.subscribe({
          next: listener1
        });

        next(7);

        expect(listener1).to.have.been.calledWith(7);
      }
    );

    it(`should allow an observer to have arbitrary channels`,
      () => {
        let channel1;
        let channel2;

        const multichannelStream = new IndefiniteObservable(
          (observer: any) => {
            channel1 = observer.channel1;
            channel2 = observer.channel2;

            return disconnect;
          }
        );

        multichannelStream.subscribe({
          channel1: listener1,
          channel2: listener2,
        } as any);

        channel1(5);
        channel2(7);

        expect(listener1).to.have.been.calledWith(5);
        expect(listener2).to.have.been.calledWith(7);
      }
    );

    it(`should identify itself as an adherent of the TC39 observable proposal`,
      () => {
        // According to the TC39 spec, if Symbol is defined, `this` should be
        // returned by stream[Symbol.observable]().  Otherwise, the key is
        // '@@observable'.
        const $$observable = typeof Symbol !== 'undefined'
          ? (Symbol as any).observable
          : '@@observable';

        expect(stream[$$observable]()).to.equal(stream);
      }
    );
  }
);

