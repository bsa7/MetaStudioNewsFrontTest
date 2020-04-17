const baseConfig = require('./webpack.base.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    client: baseConfig.resolvePath('../../src/client/index.tsx'),
    server: baseConfig.resolvePath('../../src/server/index.production.ts'),
  },
  mode: 'production',
  module: baseConfig.module,
  output: {
    filename: '[name].js',
    path: baseConfig.resolvePath('../../dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  resolve: baseConfig.resolve,
  target: 'node',
}
