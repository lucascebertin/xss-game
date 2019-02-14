const Router = require('koa-router')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const views = 'nivel/3/views'
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const criarUsuario = require('../usuario/Usuario')
const configuracao = require('../config')

module.exports = new Router({ prefix: '/nivel/3' })
  .post('/cadastro', async ctx => {
    const hash = await bcrypt.hash(ctx.request.body.senha, 8)
    const Usuario = criarUsuario(ctx.db)

    try {
      const usuario = await Usuario.create({
        nome: ctx.request.body.nome,
        email: ctx.request.body.email,
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

      return ctx.render('nivel/3/home/views/index.hbs', usuario)
    } catch (erro) {
      return ctx.render('nivel/3/erro.hbs')
    }
   })
