const clientConfig = require('./config/webpack-config/webpack.client.config')
const serverConfig = require('./config/webpack-config/webpack.server.config')

module.exports = [
    { name: 'client', ...clientConfig },
    { name: 'server', ...serverConfig },
]
