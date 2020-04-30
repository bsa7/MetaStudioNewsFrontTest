const clientDevelopmentConfig = require('./config/webpack-config/webpack.development.client.config')
const serverDevelopmentConfig = require('./config/webpack-config/webpack.development.server.config')
const clientProductionConfig = require('./config/webpack-config/webpack.production.client.config')
const serverProductionConfig = require('./config/webpack-config/webpack.production.server.config')

module.exports = (env, argv) => {
  if (env === 'development') {
    return [
      { name: 'client', ...clientDevelopmentConfig },
      { name: 'server', ...serverDevelopmentConfig },
    ]
  }
  return [
    { name: 'client', ...clientProductionConfig },
    { name: 'server', ...serverProductionConfig },
  ]
}
