const path = require('path')
const resolvePath = (pathname) => path.resolve(__dirname, pathname)
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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

module.exports = (env = 'development') => {
  return {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: env === 'development',
              },
            },
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      // new webpack.DefinePlugin(appEnvVars),
    ],
    resolve: {
      alias,
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    stats: 'verbose',
    resolvePath,
    MiniCssExtractPlugin,
  }
}
