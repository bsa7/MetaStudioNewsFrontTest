import express from 'express'
import { hostSettings } from '../../config/front-settings'
import { productionServer } from './server'

const app = express()
const PORT = hostSettings.port

app.get('*', productionServer)
app.listen(PORT, () => console.log(`Webpack listening on port ${PORT}`))
