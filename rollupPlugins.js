/**
 * This plugin ensures that a license appears exactly once for each module in
 * the build.
 *
 * This version is hand-written for this module, but a more generic one could be
 * abstracted from it.
 */
export function unifyLicenses() {
  const MOTION_LICENSE = `/** @license
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
 */`;

  const SYMBOL_OBSERVABLE_LICENSE = `/** @license for symbol-observable
 *  The MIT License (MIT)
 *
 *  Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
 *  Copyright (c) Ben Lesh <ben@benlesh.com>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
`;

  const SYMBOL_OBSERVABLE_MARKER = '/* symbol-observable */';
  const MOTION_MARKER = '/* indefinite-observable */';

  const LFCR = String.fromCharCode(13) + String.fromCharCode(10);
  const CR = String.fromCharCode(10);

  return {
    /**
     * Injects a license into each module before the bundle is output.
     */
    renderChunk(source) {
      return source
          // replaces the first instance of each marker with a license.
          .replace(SYMBOL_OBSERVABLE_MARKER, SYMBOL_OBSERVABLE_LICENSE)
          .replace(MOTION_MARKER, MOTION_LICENSE)

          // `split` is global; `replace` needs a RegEx to be global
          .split(SYMBOL_OBSERVABLE_MARKER).join('')
          .split(MOTION_MARKER).join('');
    },

    /**
     * Marks each module with its package name, and strips any recognized
     * licenses from it.  A single license will be added back in
     * `renderChunk`.
     */
    transform(source, id) {
      // Normalize line endings, so `replace` works as expected
      source = source.replace(new RegExp(LFCR, 'g'), CR);

      if (id.includes('symbol-observable')) {
        source = SYMBOL_OBSERVABLE_MARKER + source;
        source = source.replace(SYMBOL_OBSERVABLE_LICENSE, '');

      } else if (
          id.match(/\/indefinite-observable-js\/(src|dist)/) ||

          // This supports material-motion until `unifyLicenses` is generalized
          // into its own plugin.
          id.match(/\/material-motion-js\/packages\/[a-z\-]+\/(src|dist)/)) {
        source = MOTION_MARKER + source;
        source = source.replace(MOTION_LICENSE, '');
      }

      return source;
    }
  };
}

/**
 * The `resolve` plugin uses the internal name of the export (`result`).
 *
 * This replaces it with a more semantic name (`$observable`);
 */
export function renameSymbolObservable() {
  return {
    transform(source, id) {
      if (id.includes('symbol-observable')) {
        source = source.replace(
`var result = ponyfill(root);
export default result;`,
`var $observable = ponyfill(root);
export default $observable;`,
        );
      }

      return source;
    }
  }
}

/**
 * Rollup won't let you have a default export if there are named ones.  This
 * plugin appends `export default ${ name };` to the end of the bundle to
 * override Rollup.
 */
export function addDefaultExport(name) {
  return {
    renderChunk(source) {
      if (!source.includes(' ' + name)) {
        throw new Error(`${ name } not found in bundle.  Cannot add default export.`);
      }

      return source + `
export default ${ name };`
    },
  };
}
