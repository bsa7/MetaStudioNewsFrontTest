const baseConfig = require('./webpack.base.config')('production')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    client: baseConfig.resolvePath('../../src/client/index.tsx'),
    server: baseConfig.resolvePath('../../src/server/index.production.ts'),
  },
  mode: 'production',
  module: baseConfig.module,
  output: {
    filename: '[name]-[contenthash].js',
    path: baseConfig.resolvePath('../../dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  resolve: baseConfig.resolve,
  target: 'node',
}
