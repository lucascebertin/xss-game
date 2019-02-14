const Router = require('koa-router')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const views = 'nivel/3/home/views'
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const configuracao = require('../config')
const criarUsuario = require('../usuario/Usuario')

module.exports = new Router({ prefix: '/nivel/3' })
  .get('/', async ctx => {
    try {
      const authz = ctx.cookies.get('AUTHZ')
      const Usuario = criarUsuario(ctx.db)
      if(!authz)
        return ctx.render(`${views}/index.hbs`, { logado: false })

      const id = jwt.verify(authz, configuracao.segredo)
      const usuario = await Usuario.findById(id)

      return ctx.render(`${views}/index.hbs`, { logado: !!usuario })
    } catch (erro) {
      return ctx.render('nivel/3/erro.hbs')
    }
  })
