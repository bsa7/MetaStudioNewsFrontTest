const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.production.config')('production')

module.exports = {
  devtool: 'source-map',
  entry: [baseConfig.resolvePath('../../src/server/index.production.ts')],
  externals: [nodeExternals()],
  mode: 'production',
  module: baseConfig.module,
  output: {
    path: baseConfig.resolvePath('../../dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  plugins: baseConfig.plugins,
  resolve: baseConfig.resolve,
  target: 'node',
}
