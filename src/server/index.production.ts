import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import https from 'https'
// import fs from 'fs'
import { applicationSecret, hostSettings } from '../../config/front-settings'
import { productionServer } from './server'

const app = express()
app.use(cors())
app.set('trust proxy', 1)
app.use(session({
  cookie: { secure: true },
  resave: false,
  saveUninitialized: true,
  secret: applicationSecret,
}))
app.use(cookieParser())

const port: number = Number(hostSettings.http.port)
app.get('*', productionServer)
app.listen(port, () => console.log(`#2. Application listening on port ${port}`))

// if (/https/.test(hostSettings.protocol)) {
//   const sslConfig = {
//     // key: fs.readFileSync(hostSettings.https.keyFileName),
//     // cert: fs.readFileSync(hostSettings.https.certFileName),
//   }
//   https.createServer(sslConfig, app).listen(hostSettings.https.port)
// } else {
//   app.listen(hostSettings.http.port, () => console.log(`Webpack listening on port ${hostSettings.http.port}`))
// }
