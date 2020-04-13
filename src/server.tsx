// import * as path from 'path'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Router } from '@components/router'
import { hostSettings } from '@config/front-settings'
import { renderIndexPage, extractLocationInfo } from '@lib/server-helper'
import { LocationInfoBrief, AppGlobal } from '@lib/common-defs'

const safeRequire = (m: string) => eval('require')(m)
// const path = safeRequire('path')
new Router()
const express = safeRequire('express')
// const webpack = safeRequire('webpack')
// const webpackDevMiddleware = safeRequire('webpack-dev-middleware')
const app = express()
// const webpackConfigFileName = path.resolve(__dirname, '../webpack.config.js')
// const config = safeRequire(webpackConfigFileName)()
// console.log('#18', { config })
// const compiler = webpack({})
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
// }))

const appPort = hostSettings.port

const server = (incomingRequest: any, serverResponse: any, next: any) => {
  const locationInfoBrief: LocationInfoBrief = extractLocationInfo(incomingRequest);
  (global as AppGlobal).locationInfoBrief = locationInfoBrief
  const initialState = {}
  const html = ReactDOMServer.renderToStaticMarkup(
    <StaticRouter>
      <Router />
    </StaticRouter>
  )
  const head = '' // TODO
  renderIndexPage({ head, html, initialState }).then((pageContent) => {
    serverResponse.status(Router.status).send(pageContent)
  }).catch((error) => {
    serverResponse.end(error)
  })
}
app.get("*", server)

app.listen(appPort, () => {
  console.log(`Приложение слушает на 0.0.0.0:${appPort}`)
  console.log('Компиляция webpack...')
})
