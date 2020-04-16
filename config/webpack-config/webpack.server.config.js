const nodeExternals = require('webpack-node-externals')
const { alias, resolvePath, webpack } = require('./webpack.base.config')

module.exports = {
  entry: [resolvePath('../../src/server/server.tsx')],
  externals: [nodeExternals()],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  output: {
    path: resolvePath('../../dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  target: 'node',
};
