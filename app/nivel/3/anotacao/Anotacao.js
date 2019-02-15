const mongoose = require('mongoose')

const schemaDeCompatilhamentos = mongoose.Schema({
  usuario: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'usuario'
  },
  lido: mongoose.SchemaTypes.Boolean
})

const schema = mongoose.Schema({
  usuario: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'usuario'
  },
  titulo: mongoose.SchemaTypes.String,
  descricao: mongoose.SchemaTypes.String,
  compartilhamentos: [schemaDeCompatilhamentos]
})

const criarSchema = conexao => conexao.model(
  'anotacao',
  schema,
  'anotacao'
)

module.exports = criarSchema