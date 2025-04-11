const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');

module.exports = (env) => {
  return merge(base(env), {
    entry: {
      main: './src/electron/index.ts',
      app: './src/index.tsx',
      preload: './src/electron/preload.ts'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../app')
    }
  });
};
