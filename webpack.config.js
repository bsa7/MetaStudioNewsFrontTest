const path = require('path');
const resolvePath = (pathname) => path.resolve(__dirname, pathname);
const alias = {
  "@actions": resolvePath("./src/actions"),
  "@components": resolvePath("./src/components"),
  "@constants": resolvePath("./src/constants"),
  "@lib": resolvePath("./src/lib"),
  "@reducers": resolvePath("./src/reducers")
}

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
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
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}
