process.env.BABEL_ENV = 'test';

module.exports = function(wallaby) {
  return {
    files: [
      {
        pattern: 'src/**/*',
        instrument: true
      },
      {
        pattern: 'test/helpers/**/*',
        instrument: false
      },
      {
        pattern: 'test/resources/**/*',
        instrument: false
      },
      {
        pattern: 'test/*.js',
        instrument: false
      }
    ],

    tests: ['test/unit/**/*.js'],

    testFramework: 'mocha',

    env: {
      type: 'node',
      params: {
        env: 'NODE_ENV=test'
      }
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    setup: function(w) {
      const mocha = w.testFramework;
      mocha.delay();
      require('./test/Setup');
    }
  };
};
