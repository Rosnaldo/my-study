const CracoEsbuildPlugin = require('craco-esbuild');
const path = require('path');
const { EnvironmentPlugin, ProvidePlugin } = require('webpack');

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, './src')
    },
    plugins: [
      new ProvidePlugin({
        React: 'react'
      }),
      new EnvironmentPlugin(require('./config/env'))
    ],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.externals = {
        'mapbox-gl': 'mapboxgl'
      };

      webpackConfig.resolve.fallback = {
        fs: false,
        path: false
      };

      webpackConfig.module = {
        ...(webpackConfig.module || {}),
        noParse: /(mapbox-gl)\.js$/
      };

      return webpackConfig;
    }
  },
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        esbuildLoaderOptions: {
          loader: 'tsx',
          target: 'es2015'
        },
        esbuildMinimizerOptions: {
          target: 'es2015',
          css: true,
          minify: true,
          sourcemap: false
        }
      }
    }
  ]
};
