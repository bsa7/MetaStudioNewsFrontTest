import { hostSettings } from '@config/front-settings'
import { server } from '@src/server/server'

// const path = require('path')
const safeRequire = (m: string) => eval('require')(m)
const express = safeRequire('express')
// const webpack = safeRequire('webpack')
// const webpackDevMiddleware = safeRequire('webpack-dev-middleware')
const app = express()
// const webpackConfigFileName = path.resolve(__dirname, '../webpack.config.js')
// const config = safeRequire(webpackConfigFileName)()
// const compiler = webpack(config)
// console.log('#18', { config })
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
// }))
const appPort = hostSettings.port
// TODO
app.get("*", server)
app.listen(appPort, () => {
  console.log(`Приложение слушает на 0.0.0.0:${appPort}`)
  console.log('Компиляция webpack...')
})
