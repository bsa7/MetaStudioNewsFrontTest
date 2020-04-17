const baseConfig = require('./webpack.base.config')

module.exports = {
  devtool: 'source-map',
  entry: {
    main: [baseConfig.resolvePath('../../src/client/index.tsx'), 'webpack-hot-middleware/client'],
  },
  mode: 'development',
  module: baseConfig.module,
  output: {
    path: baseConfig.resolvePath('../../dist'),
    filename: 'client.js',
    publicPath: '/',
  },
  plugins: baseConfig.plugins,
  resolve: baseConfig.resolve,
}
