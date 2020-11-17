'use strict'
console.clear()

import mongoose from 'mongoose'
import app from './express.js'
import config from '../config/config.js'
// TODO: setup connection to db

app.listen(config.port, () => {
  console.log(`Server is runing on port ${config.port}`)
})
