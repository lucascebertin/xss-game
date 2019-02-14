module.exports = {
  HOST: process.env.MONGO_HOST || 'mongo',
  PORT: process.env.MONGO_PORT || 27017,
  USER: process.env.MONGO_USERNAME || 'user',
  PASS: process.env.MONGO_PASSWORD || 'pass',
  DB:   process.env.MONGO_DATABASE   || 'db'
}