const Router = require('koa-router')
const views = 'nivel/3/autenticacao/views'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const criarUsuario = require('../usuario/Usuario')
const configuracao = require('../config')

module.exports = new Router({ prefix: '/nivel/3' })
  .get('/sair', ctx => {
    ctx.cookies.set('AUTHZ', null)
    return ctx.redirect('/nivel/3/')
  })
  .get('/autenticar', ctx => ctx.render(`${views}/index.hbs`))
  .post('/autenticar', async ctx => {
    try {
      const Usuario = criarUsuario(ctx.db)
      const hash = await bcrypt.hash(ctx.request.body.senha, configuracao.SALT)

      const usuario = await Usuario.findOne({
        email: ctx.request.body.email,
        password: hash
      })

      if(usuario === null)
        return ctx.render(`${views}/erro.hbs`)

      ctx.cookies.set('AUTHZ', jwt.sign({
        id: usuario._id
      }, configuracao.segredo, {
        expiresIn: 86400
      }), {
        httpOnly: false
      })

      return ctx.redirect('/nivel/3/')
    } catch (erro) {
      return ctx.render(`${views}/erro.hbs`)
    }
  })
