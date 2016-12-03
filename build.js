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
 *
 *  @flow
 */

const {
  readFileSync,
  writeFileSync,
} = require('fs');

const source = readFileSync('./dist/index.js').toString();
const symbolObservable = readFileSync('./third_party/symbol-observable/index.js').toString();

writeFileSync(
  './dist/indefinite-observable.js',
  source.replace(
    /"use strict";\nconst symbol_observable_\d = require\("symbol-observable"\);/,
    symbolObservable
  ).replace(
    /symbol_observable_\d\.default/,
    '$$observable'
  ).replace(
    /Object\.defineProperty\(exports, "__esModule", \{ value: true \}\);\nexports\.default = IndefiniteObservable;\n\/\/# sourceMappingURL=index\.js\.map/,
    ''
  )
);
