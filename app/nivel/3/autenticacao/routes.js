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
  .post('/autenticacao', async ctx => {
    try {
      const usuario = await Usuario.findOne({
        email: ctx.body.email,
        senha: await bcrypt.hash(ctx.body.senha, 8)
      })

      ctx.cookies.set('AUTHZ', jwt.sign({
        id: usuario._id
      }, configuracao.segredo, {
        expiresIn: 86400
      }), {
        httpOnly: false
      })

      return ctx.render('nivel/3/home/views/index.hbs', usuario)
    } catch (erro) {
      return ctx.render('nivel/3/erro.hbs')
    }
  })
