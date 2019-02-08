const Koa = require('koa')
const static = require('koa-static')
const viewEngine = require('koa-views')
const qs = require('koa-qs')
const koabody = require('koa-body')

const home = require('./home/routes')
const nivel1 = require('./nivel/1/routes')
const nivel2 = require('./nivel/2/routes')

const views = viewEngine(__dirname, {
  map: { hbs: 'handlebars' },
  options: {
    helpers: {
      uppercase: str => str.toUpperCase()
    },
    partials: {}
  }
})

const app = new Koa()
  .use(koabody({ multipart: true }))
  .use(views)
  .use(home.routes())
  .use(nivel1.routes())
  .use(nivel2.routes())
  .use(static('static'))

qs(app, 'extended')

module.exports = app
