module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    browsers: process.env.TRAVIS
      ? ['Chrome', 'Firefox']
      : ['Chrome', 'ChromeCanary', 'Safari', 'Firefox'],
    reporters: ['progress'],
    client: {
      mocha: {
        reporter: 'html',
      },
    },
    files: [
      '**/dist/**/__tests__/**',
    ],
    exclude: [
      '**/*.map',
    ],
    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
  });
};
