const path = require('path');
const webpack = require('webpack');

const envName = (env) => {
  if (env.production) {
    return 'production';
  }
  if (env.test) {
    return 'test';
  }
  return 'development';
};

const envToMode = (env) => {
  if (env.production) {
    return 'production';
  }
  return 'development';
};

module.exports = (env) => {
  return {
    target: 'electron-renderer',
    mode: envToMode(env),
    node: {
      __dirname: false,
      __filename: false
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        env: path.resolve(__dirname, `../config/env_${envName(env)}.json`),
        '~': path.resolve(__dirname, '../src')
      }
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: path.resolve(__dirname, '../tsconfig.electron.json')
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './public/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        ...require('./env')
      })
    ]
  };
};
