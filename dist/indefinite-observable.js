;(function(){var global=typeof window!=="undefined"&&window||typeof self!=="undefined"&&self||{};var GLOBAL=global;var root=global;var __SB_PUNDLE_DEFAULT_EXPORT={};var __sb_pundle={cache:{},extensions:[".js"],resolve:function resolve(path){return path}};var __require=void 0;function __sb_pundle_register(filePath,callback){if(__sb_pundle.cache[filePath]){__sb_pundle.cache[filePath].callback=callback}else{var module={id:filePath,filePath:filePath,callback:callback,exports:__SB_PUNDLE_DEFAULT_EXPORT,parents:[]};__sb_pundle.cache[filePath]=module}}function __sb_pundle_require_module(fromModule,request){if(!(request in __sb_pundle.cache)){throw new Error("Module not found")}var module=__sb_pundle.cache[request];if(module.parents.indexOf(fromModule)===-1&&fromModule!=="$root"){module.parents.push(fromModule)}if(module.exports===__SB_PUNDLE_DEFAULT_EXPORT){module.exports={};module.callback.call(module.exports,module,module.exports)}return module.exports}function __sb_generate_require(moduleName){var bound=__sb_pundle_require_module.bind(null,moduleName);bound.cache=__sb_pundle.cache;bound.extensions=__sb_pundle.extensions;bound.resolve=__sb_pundle.resolve;return bound}__require=__sb_generate_require("$root");__sb_pundle_register('$root/index.ts', function(module, exports) {
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
 */"use strict";var __dirname='',__filename='$root/index.ts',__require=__sb_generate_require(__filename);var IndefiniteObservable=function(){function IndefiniteObservable(creator){this._listeners=new Set();this._creator=creator;}IndefiniteObservable.prototype.subscribe=function(listener){var stop;var listeners=this._listeners;if(!listener.next){listener={next:listener};}listeners.add(listener);if(listeners.size===1){stop=this._creator({next:this._next.bind(this)});}return{unsubscribe:function(){listeners.delete(listener);if(listeners.size===0&&stop){stop();}}};};IndefiniteObservable.prototype._next=function(value){this._listeners.forEach(function(listener){return listener.next(value);});};return IndefiniteObservable;}();Object.defineProperty(exports,"__esModule",{value:true});exports.default=IndefiniteObservable;
});__require('$root/index.ts');})();
//# sourceMappingURL=indefinite-observable.js.map