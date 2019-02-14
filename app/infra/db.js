const mongoose = require('mongoose')
const config = require('./config')

const mongo = `mongodb://${config.HOST}:${config.PORT}/${config.DB}`

mongoose.connection.on('error', err =>
  console.log(`Mongoose default connection error: ${err}`))

mongoose.connection.on('disconnected', () =>
  console.log(`Mongoose default connection disconnected - ${config.DB}`))

mongoose.connection.on('connected', () =>
  console.log(`Mongoose default connection established - ${config.DB}`))

module.exports = mongoose.connect(mongo, {
  user: config.USER,
  pass: config.PASS,
  poolSize: 5,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000,
  useNewUrlParser: true
})