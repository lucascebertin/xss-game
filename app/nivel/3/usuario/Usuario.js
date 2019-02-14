const mongoose = require('mongoose')
const schemaDeUsuario = mongoose.Schema({
  nome: mongoose.SchemaTypes.String,
  email: mongoose.SchemaTypes.String,
  password: mongoose.SchemaTypes.String
})

module.exports = mongoose.model(
  'usuario',
  schemaDeUsuario,
  'usuario'
)