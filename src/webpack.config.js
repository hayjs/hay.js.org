const path = require('path');

const chalk = require('chalk');
const webpack = require('webpack');

const DefinePlugin = webpack.DefinePlugin;
const NamedModulesPlugin = webpack.NamedModulesPlugin;
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;

const CONSTANTS = {
  ENV: JSON.stringify('development'),
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  }
};

let ENTRY_FILES = [
  'webpack-hot-middleware/client?reload=true',
  'webpack/hot/only-dev-server',
  'react-hot-loader/patch'
];

if (process.env.NODE_ENV === 'production') {
  ENTRY_FILES = [];
}

module.exports = {
  context: process.cwd(),
  entry: {
    // 'ngBootstrap': [...ENTRY_FILES, 'angular-bootstrap']
  },
  output: {
    path: '/',
    publicPath: '/',
    filename: '[name].js'
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.(js|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              sourceMaps: 'inline',
              cacheDirectory: true,
              env: 'webpack'
            }
          }
        ],
        include: [
          path.resolve('src/js')
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin(CONSTANTS),
    new LoaderOptionsPlugin({
      options: {
        resolve: {},
        context: './src'
      }
    }),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [path.resolve(process.cwd(), 'node_modules'), path.resolve(process.cwd(), 'src/js')]
  },
  target: 'web',
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
