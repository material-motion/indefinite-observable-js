import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

import {
  renameSymbolObservable,
  unifyLicenses,
  addDefaultExport,
} from './rollupPlugins';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/indefinite-observable.bundle.js',
      format: 'esm',
    },
    plugins: [
      typescript(),
      resolve(),
      renameSymbolObservable(),
      unifyLicenses(),
      addDefaultExport('IndefiniteObservable'),
    ],
  },
];

