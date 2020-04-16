const { alias, resolvePath, webpack } = require('./webpack.base.config')
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: [resolvePath('../../src/client/index.tsx'), 'webpack-hot-middleware/client'],
  },
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
    filename: 'client.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
}
