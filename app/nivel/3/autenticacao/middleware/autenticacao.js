const jwt = require('jsonwebtoken')
const configuracao = require('../../config')
const criarModel = require('../../usuario/Usuario')

module.exports = async (context, next) => {
  const cookieDeAutenticacao = context && context.cookies
    ? context.cookies.get('AUTHZ')
    : ''

  if(cookieDeAutenticacao === '')
    return context.redirect('/nivel/3/autenticar')

  const token = jwt.verify(
    cookieDeAutenticacao,
    configuracao.segredo
  )

  if(token === null || token === '' || token === undefined)
    return context.redirect('/nivel/3/autenticar')

  const Usuario = criarModel(context.db)
  context.params.usuario = await Usuario.findById(token.id)

  return await next()
}