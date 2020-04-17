import express from 'express'
import webpack from 'webpack'
// import webpackDevMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
// import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import { hostSettings } from '../../config/front-settings'
// import webpackConfig from '../../webpack.config.js'
// import { MODES } from '../constants/enums'
import { productionServer } from './server'

// const modeCommandLineArgument = process.argv.find((arg) => /--mode/.test(arg))
// const mode = modeCommandLineArgument ? modeCommandLineArgument.split('=')[1] : MODES.development
// const devMode = mode === MODES.development
// const envConfig = webpackConfig(mode)
// const clientConfig = (envConfig as any[]).find((config) => config.name === 'client')
// const compiler = webpack(envConfig as any[])
// const clientCompiler = compiler.compilers.find((compiler) => compiler.name === 'client')
const app = express()
const PORT = hostSettings.port

app.get('*', productionServer)
app.listen(PORT, () => console.log(`Webpack listening on port ${PORT}`))
