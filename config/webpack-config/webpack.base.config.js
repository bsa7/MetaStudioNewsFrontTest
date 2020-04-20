const path = require('path');
const resolvePath = (pathname) => path.resolve(__dirname, pathname)
const webpack = require('webpack');

const alias = {
  "@actions": resolvePath('../../src/actions'),
  "@components": resolvePath('../../src/components'),
  "@config": resolvePath('../../config'),
  "@constants": resolvePath('../../src/constants'),
  "@interface-components": resolvePath('../../src/components/shared/interface'),
  "@lib": resolvePath('../../src/lib'),
  "@middlewares": resolvePath('../../src/middlewares'),
  "@reducers": resolvePath('../../src/reducers'),
  "@src": resolvePath('../../src'),
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  resolvePath,
}
