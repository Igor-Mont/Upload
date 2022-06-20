import 'dotenv/config'
import express, { json } from 'express'
import cors from 'cors'
import { routes } from './routes'
import path from 'path'

const app = express()

app.use(cors())
app.use(json())

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

app.use(routes)

export default app