const Router = require('koa-router')
const views = 'nivel/1/views'

module.exports = new Router({ prefix: '/nivel/1' })
  .get('/', ctx => ctx.render(`${views}/index.hbs`, { }))
  .get('/boas/vindas', ctx => {
    const nome = ctx.query.nome
    const cor = ctx.query.cor

    ctx.append('x-xss-protection', '0')
    ctx.cookies.set('AUTHZ', null)

    return ctx.render(`${views}/boasvindas.hbs`,
      { nome, cor })
  })