module.exports = {
  HOST: process.env.MONGO_HOST || '127.0.0.1',
  PORT: process.env.MONGO_PORT || 27017,
  USER: process.env.MONGO_USERNAME || 'wh00t',
  PASS: process.env.MONGO_PASSWORD || 'superduperpasswordwithsuperprotection',
  DB:   process.env.MONGO_DATABASE   || 'wh00t'
}