const Router = require('koa-router')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const views = 'nivel/3/views'
const mongoose = require('mongoose')

module.exports = new Router({ prefix: '/nivel/3' })
  .get('/anotacoes', async ctx => { })
  .get('/anotacoes/:id', async ctx => { })
  .post('/anotacoes', async ctx => { })
