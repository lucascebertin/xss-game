const mongoose = require('mongoose')
const config = require('./config')

const mongo = `mongodb://${config.USER}:${config.PASS}@${config.HOST}:${config.PORT}/${config.DB}`

module.exports = mongoose.createConnection(mongo, {})