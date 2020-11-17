import express from 'express'
import bodyParser from 'body-parser'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'

// init app
const app = express()

// config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compress())
app.use(helmet())
app.use(cors())

// mount routes
app.get('/', (req, res) => {
  return res.status(200).send('<h1>API working...</h1>')
})

// exort app
export default app
