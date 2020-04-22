import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import { applicationSecret, hostSettings } from '../../config/front-settings'
import webpackConfig from '../../webpack.config.js'
import { MODES } from '../constants/enums'

const modeCommandLineArgument = process.argv.find((arg) => /--mode/.test(arg))
const mode = modeCommandLineArgument ? modeCommandLineArgument.split('=')[1] : MODES.development
const devMode = mode === MODES.development
const envConfig = webpackConfig(mode)
const clientConfig = (envConfig as any[]).find((config) => config.name === 'client')
const compiler = webpack(envConfig as any[])
const clientCompiler = compiler.compilers.find((compiler) => compiler.name === 'client')
const app = express()
app.set('trust proxy', 1)
app.use(session({
  cookie: { secure: true },
  resave: false,
  saveUninitialized: true,
  secret: applicationSecret,
}))
app.use(cookieParser())
const PORT = hostSettings.port

if (devMode) {
  const options: webpackDevMiddleware.Options = {
    index: false,
    publicPath: clientConfig.output.publicPath,
    serverSideRender: true,
  }
  app.use(webpackDevMiddleware(compiler, options))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler as any))
}
app.listen(PORT, () => console.log(`Webpack listening on port ${PORT}`))
