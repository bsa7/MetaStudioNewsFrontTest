// import * as path from 'path'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
// import express from 'express'
// import * as webpack from 'webpack'
import { Layout, HomePage } from '@components/index'
import { hostSettings } from '@config/front-settings'
import { renderIndexPage } from '@lib/server-helper'

const safeRequire = (m: string) => eval('require')(m)
const path = safeRequire('path')
const express = safeRequire('express')
const webpack = safeRequire('webpack')
const webpackDevMiddleware = safeRequire('webpack-dev-middleware')
const app = express()
const webpackConfigFileName = path.resolve(__dirname, '../webpack.config.js')
const config = safeRequire(webpackConfigFileName)
const compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
// }))

const appPort = hostSettings.port

const server = (incomingRequest: any, serverResponse: any, next: any) => {
  const initialState = {}
  const html = ReactDOMServer.renderToStaticMarkup(
    <Layout>
      <HomePage />
    </Layout>,
  )
  const head = '' // TODO
  renderIndexPage({ head, html, initialState }).then((pageContent) => {
    serverResponse.status(200).send(pageContent)
  }).catch((error) => {
    console.error(error, { message: 'Произошла ошибка при рендеринге index.html' })
    serverResponse.end(error)
  })
}
app.get("*", server)

app.listen(appPort, () => {
  console.log(`Приложение слушает на 0.0.0.0:${appPort}`)
  console.log('Компиляция webpack...')
})
