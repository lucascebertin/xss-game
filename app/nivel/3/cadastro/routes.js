const Router = require('koa-router')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const views = 'nivel/3/views'
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Usuario = require('../usuario/Usuario')
const configuracao = require('../config')

module.exports = new Router({ prefix: '/nivel/3' })
  .post('/cadastro', async ctx => {
    const hash = await bcrypt.hash(ctx.body.senha, 8)

    try {
      const usuario = await Usuario.create({
        nome: ctx.body.nome,
        email: ctx.body.email,
        password: hash
      })

      const token = jwt.sign({
        id: usuario._id
      }, configuracao.segredo, {
        expiresIn: 86400
      })

      ctx.cookies.AUTHZ = token

      return ctx.render('nivel/3/home/views/index.hbs', usuario)
    } catch (erro) {
      return ctx.render('nivel/3/erro.hbs')
    }
   })
