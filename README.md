# Indefinite Observable ##

[![Build Status](https://travis-ci.org/material-motion/indefinite-observable-js.svg?branch=develop)](https://travis-ci.org/material-motion/indefinite-observable-js)
[![codecov](https://codecov.io/gh/material-motion/indefinite-observable-js/branch/develop/graph/badge.svg)](https://codecov.io/gh/material-motion/indefinite-observable-js)

## Why? ##

There are a lot of great Observable implementations, but they're baked into featureful libraries which contribute to both complexity and filesize.  We wanted the simplest-possible Observable implementation, with no operators, no fancy scheduling: [read the entire source](https://github.com/material-motion/indefinite-observable-js/blob/develop/dist/index.js) without scrolling.

Indefinite Observable is a subset of the [TC39 Observable proposal](https://tc39.github.io/proposal-observable/) that never `complete`s or `error`s.  It implements the [minimal-necessary functionality](https://en.wikipedia.org/wiki/You_aren't_gonna_need_it), but it should be completely interchangable with the TC39 proposal for the subset that it does implement.

If you want a complete Observables library that works out-of-the-box, check out [xstream](https://github.com/staltz/xstream/), [RxJS](https://github.com/ReactiveX/RxJS/), [Most](https://github.com/cujojs/most/), [Bacon](https://github.com/baconjs/bacon.js/), or [Kefir](https://github.com/rpominov/kefir/).  If you want to build your own Observables library that includes just the functionality you need, try Indefinite Observable.

## Usage ##

```javascript
import IndefiniteObservable from 'indefinite-observable';

const moveEvent$ = new IndefiniteObservable(
  (observer) => {
    // Whenever you want the observable to dispatch a value, call
    // observer.next(value).
    element.addEventListener('pointermove', observer.next);

    // Return a function that will perform any necessary clean up when the
    // observable is unsubscribed from.
    return function unsubscribe() {
      element.removeEventListener('pointermove', observer.next);
    }
  }
);

// Call subscribe with an argument named next to receive values dispatched by
// the observable.
//
// subscribe returns a unsubscribe function.  Call that when you no longer want
// to receive dispatches from the observable.
const unsubscribe = moveEvent$.subscribe({
  next(moveEvent) {
    console.log('got a pointer event: ', moveEvent);
  }
});
```

## Installation ##

```
yarn add indefinite-observable
```

or include as a script tag:

```
<script src = 'https://unpkg.com/indefinite-observable/dist/indefinite-observable.js'></script>
```

## License ##

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
