const Router = require('koa-router')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const views = 'nivel/3/cadastro/views'
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const criarUsuario = require('../usuario/Usuario')
const configuracao = require('../config')
const erro = `${views}/erro.hbs`

module.exports = new Router({ prefix: '/nivel/3' })
  .get('/cadastro/erro', ctx => {
    if(ctx.query.tipo && ctx.query.tipo === 'senha')
      return ctx.render(erro, { senha: true })
    else if(ctx.query.tipo && ctx.query.tipo === 'nome')
      return ctx.render(erro, { nome: true })
    else if(ctx.query.tipo && ctx.query.tipo === 'email')
      return ctx.render(erro, { email: true })
  })
  .get('/cadastrar', ctx => ctx.render('nivel/3/cadastro/views/index.hbs'))
  .post('/cadastrar', async ctx => {
    const valoresInvalidos = ['', null, undefined]
    const nome = ctx.request.body.nome
    if(valoresInvalidos.includes(nome) || nome.length > 100)
      return ctx.redirect('/nivel/3/cadastro/erro?tipo=nome')

    const email = ctx.request.body.email
    if(valoresInvalidos.includes(email) ||
      email.indexOf('@') === -1 ||
      email.length > 200)
      return ctx.redirect('/nivel/3/cadastro/erro?tipo=email')

    const senha = ctx.request.body.senha
    const confirmacao = ctx.request.body.confirme
    if(valoresInvalidos.includes(senha) ||
      valoresInvalidos.includes(confirmacao) ||
      senha.length > 200 ||
      confirmacao.length > 200 ||
      senha !== confirmacao)
      return ctx.redirect('/nivel/3/cadastro/erro?tipo=senha')

    const hash = await bcrypt.hash(senha, configuracao.SALT)
    const Usuario = criarUsuario(ctx.db)

    try {
      const usuarioExistente = await Usuario.findOne({
        email
      })

      if(usuarioExistente !== null)
        return ctx.render('nivel/3/cadastro/views/existe.hbs')

      const usuario = await Usuario.create({
        nome,
        email,
        password: hash
      })

      const token = jwt.sign({
        id: usuario._id
      }, configuracao.segredo, {
        expiresIn: 86400
      })

      ctx.cookies.set('AUTHZ', token, {
        httpOnly: false
      })

      return ctx.redirect('/nivel/3/')
    } catch (erro) {
      return ctx.render('nivel/3/autenticacao/views/erro.hbs')
    }
   })
