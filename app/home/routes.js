const Router = require('koa-router')
const views = 'home'

module.exports = new Router()
  .get('/', ctx => ctx.render(`${views}/index.hbs`, { }))
