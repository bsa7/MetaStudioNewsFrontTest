const baseConfig = require('./webpack.base.config')('development')

module.exports = {
  devtool: 'source-map',
  entry: {
    jsMain: [
      baseConfig.resolvePath('../../src/client/index.tsx'),
      'webpack-hot-middleware/client',
    ],
    cssBootstrap: [
      baseConfig.resolvePath('../../src/assets/scss/bootstrap.scss'),
      'webpack-hot-middleware/client',
    ],
    cssUnstyled: [
      baseConfig.resolvePath('../../src/assets/scss/unstyled.scss'),
      'webpack-hot-middleware/client',
    ],
    cssApplication: [
      baseConfig.resolvePath('../../src/assets/scss/application.scss'),
      'webpack-hot-middleware/client',
    ],
  },
  mode: 'development',
  module: baseConfig.module,
  output: {
    path: baseConfig.resolvePath('../../dist'),
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  plugins: [
    ...baseConfig.plugins,
    new baseConfig.MiniCssExtractPlugin({
      chunkFilename: '[id].[hash].css',
      filename: '[name]-[hash].css',
    }),
  ],
  resolve: baseConfig.resolve,
  stats: baseConfig.stats,
}
