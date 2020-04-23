import express from 'express'
import { hostSettings } from '../../config/front-settings'
import { productionServer } from './server'

const app = express()
if (/https/.test(hostSettings.protocol)) {
  // TODO implement production ssl
} else {
  app.get('*', productionServer)
  app.listen(hostSettings.http.port, () => console.log(`Webpack listening on port ${hostSettings.http.port}`))
}
