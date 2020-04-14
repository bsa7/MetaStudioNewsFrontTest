const path = require('path')
const MODES = {
  development: 'development',
  production: 'production',
}
const resolvePath = (pathname) => path.resolve(__dirname, pathname)
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const alias = {
  "@actions": resolvePath("./src/actions"),
  "@components": resolvePath("./src/components"),
  "@config": resolvePath("./config"),
  "@constants": resolvePath("./src/constants"),
  "@lib": resolvePath("./src/lib"),
  "@reducers": resolvePath("./src/reducers"),
  "@src": resolvePath("./src"),
}

module.exports = (env, args = {}) => {
  const mode = process.env.NODE_ENV || env || args.mode
  const filename = mode === MODES.development ? '[name].js' : '[name]-[contenthash].js'

  return {
    context: __dirname,
    // devServer: {
    //   contentBase: resolvePath('./dist'),
    //   hot: true,
    // },
    devtool: mode === MODES.development && 'source-map',
    entry: {
      client: resolvePath('./src/client/index.tsx'),
      server: resolvePath('./src/server/index.ts'),
    },
    // devServer: MODES.development && {
    //   contentBase: path.join(__dirname, 'dist'),
    //   compress: false,
    //   port: 3001,
    // },
    // externals: {
    //   react: 'React',
    //   'react-dom': 'ReactDOM'
    // },
    mode,
    module: {
      noParse: (fileName) => {
        return /node_modules/.test(fileName) && /express/.test(fileName)
      },
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          exclude: /node_modules/,
          use: [
            {
              loader: 'source-map-loader'
            }
          ]
        },
        {
          test: /\.css/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
          ]
        }
      ]
    },
    node: {
      __dirname: false,
      __filename: false,
      child_process: "empty",
      fs: 'empty',
      net: 'empty',
    },
    // optimization: {
    //   splitChunks: {
    //       cacheGroups: {
    //           vendors: {
    //               priority: -10,
    //               test: /[\\/]node_modules[\\/]/,
    //               enforce: true
    //           },
    //       },
    //       // concatenateModules: false,
    //       chunks: 'all',
    //       minChunks: 1,
    //       minSize: 0,
    //       name: true,
    //   }
    // },
    output: {
      filename,
      path: resolvePath('./dist'),
      publicPath: './',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        chunks: ['client'],
        filename: resolvePath('./dist/index.template.html'),
        inject: false,
        minify: {
          collapseWhitespace: false
        },
        template: resolvePath('./src/index.ejs'),
      }),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        chunks: ['server'],
        filename: resolvePath('./development.config.js'),
        inject: false,
        template: resolvePath('./development.config.template.js'),
      }),
      new HtmlWebpackHarddiskPlugin()
    ],
    resolve: {
      alias,
      extensions: ['.tsx', '.ts', '.js']
    },
    target: 'node',
  }
}
