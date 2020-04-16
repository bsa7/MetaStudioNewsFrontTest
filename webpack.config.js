import { MODES } from './src/constants/enums'
const clientConfig = require('./config/webpack-config/webpack.client.config')
const serverConfig = require('./config/webpack-config/webpack.server.config')

export default (env) => {
  if (env === MODES.development) {
    return [
      { name: 'client', ...clientConfig },
      { name: 'server', ...serverConfig },
    ]
  }
  return [
    { name: 'client', ...clientConfig },
    { name: 'server', ...serverConfig },
  ]
}
