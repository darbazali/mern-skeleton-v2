import express from 'express'
import bodyParser from 'body-parser'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'

// import custom modules
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'

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

app.use('/', userRoute)
app.use('/', authRoute)

// auth error handling
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: `${err.name} : ${err.message}` })
  } else if (err) {
    res.status(400).json({ error: `${err.anem} : ${err.message}` })
    console.log(err)
  }
})
// exort app
export default app
