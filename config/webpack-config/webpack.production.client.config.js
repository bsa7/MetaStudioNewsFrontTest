const baseConfig = require('./webpack.base.production.config')('production')

module.exports = {
  devtool: 'source-map',
  entry: {
    jsMain: [
      baseConfig.resolvePath('../../src/client/index.tsx'),
    ],
    cssBootstrap: [
      baseConfig.resolvePath('../../src/assets/scss/bootstrap.scss'),
    ],
    cssUnstyled: [
      baseConfig.resolvePath('../../src/assets/scss/unstyled.scss'),
    ],
    cssApplication: [
      baseConfig.resolvePath('../../src/assets/scss/application.scss'),
    ],
  },
  mode: 'production',
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
