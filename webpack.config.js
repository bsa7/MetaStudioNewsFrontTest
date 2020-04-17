const clientDevelopmentConfig = require('./config/webpack-config/webpack.development.client.config')
const serverDevelopmentConfig = require('./config/webpack-config/webpack.development.server.config')
const productionConfig = require('./config/webpack-config/webpack.production.config')

module.exports = (env, argv) => {
  if (env === 'development') {
    return [
      { name: 'client', ...clientDevelopmentConfig },
      { name: 'server', ...serverDevelopmentConfig },
    ]
  }
  return productionConfig
}
