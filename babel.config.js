module.exports = api => {
  api.cache.using(() => process.env.BABEL_ENV);
  return {
    presets: [
      api.env(['dev-webpack', 'webpack'])
        ? [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['> 1%', 'IE >= 11']
              },
              modules: false,
              debug: false,
              useBuiltIns: 'entry'
            }
          ]
        : null,
      '@babel/preset-react'
    ].filter(Boolean),
    plugins: [
      api.env(['test', 'test-coverage'])
        ? 'babel-plugin-dynamic-import-node'
        : '@babel/syntax-dynamic-import',
      api.env('dev-webpack') ? 'react-hot-loader/babel' : null,
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      api.env(['test', 'test-coverage'])
        ? 'babel-plugin-transform-es2015-modules-commonjs'
        : null,
      api.env('test-coverage') ? 'istanbul' : null,
      'babel-plugin-root-import',
      'babel-plugin-styled-components'
    ].filter(Boolean)
  };
};
