#!/usr/local/bin/node

// This file handles bundling (e.g. importing symbol-observable).
// yarn run build also runs tsc, which generates the d.ts file
//
// This might all be overkill, but it will be nice to have proper typechecking
// and not have to maintain the d.ts by hand.

const Path = require('path')
const Pundle = require('pundle')
const writeFileSync = require('fs').writeFileSync;

const pundle = new Pundle({
  entry: [require.resolve('./src/index.ts')],
  pathType: 'filePath',
  rootDirectory: __dirname + '/src',
  replaceVariables: {
    'process.env.NODE_ENV': 'production',
  },
});

pundle.loadPlugins([
  [
    'typescript-pundle',
    {
      config: {
        typescriptPath: require.resolve('typescript'),
        compilerOptions: {
          lib: [
            "es2015",
            "dom"
          ],
          noImplicitAny: true,
          noImplicitThis: true,
          strictNullChecks: true,
          target: "es5"
        }
      }
    }
  ]
]).then(
  () => {
    pundle.loadLoaders([
      { extensions: ['.ts', '.tsx'], loader: require('pundle/lib/loaders/javascript').default },
    ])

    return pundle.compile();
  }
).then(
  () => pundle.generate({ sourceMap: true })
).then(
  generated => {
    writeFileSync('./dist/indefinite-observable.js', `${generated.contents}\n//# sourceMappingURL=indefinite-observable.js.map`);
  }
).catch(console.error);
