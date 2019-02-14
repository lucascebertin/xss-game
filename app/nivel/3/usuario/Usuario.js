const mongoose = require('mongoose')
const schemaDeUsuario = mongoose.Schema({
  nome: mongoose.SchemaTypes.String,
  email: mongoose.SchemaTypes.String,
  password: mongoose.SchemaTypes.String
})

const criarSchema = conexao => conexao.model(
  'usuario',
  schemaDeUsuario,
  'usuario'
)

module.exports = criarSchema