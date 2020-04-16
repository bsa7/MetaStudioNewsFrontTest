import { MODES } from './src/constants/enums'
const clientDevelopmentConfig = require('./config/webpack-config/webpack.development.client.config')
const serverDevelopmentConfig = require('./config/webpack-config/webpack.development.server.config')

export default (env) => {
  if (env === MODES.development) {
    return [
      { name: 'client', ...clientDevelopmentConfig },
      { name: 'server', ...serverDevelopmentConfig },
    ]
  }
  return [
    { name: 'client', ...clientDevelopmentConfig },
    { name: 'server', ...serverDevelopmentConfig },
  ]
}
