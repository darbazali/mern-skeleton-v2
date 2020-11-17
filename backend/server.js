'use strict'
console.clear()

import mongoose from 'mongoose'
import app from './express.js'
import config from '../config/config.js'

// TODO: setup connection to db
mongoose.Promise = global.Promise
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB connected at ${config.mongoUri}`))
  .catch((err) => console.log(err))

// listen for requrests at port 5000
app.listen(config.port, () => {
  console.log(`Server is runing on port ${config.port}`)
})
