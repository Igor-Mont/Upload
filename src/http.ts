import express, { json, Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(json())

export default app