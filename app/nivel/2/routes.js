const Router = require('koa-router')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const views = 'nivel/2/views'

const magicNumbers = {
  jpeg: 'ffd8ffe0',
  png: '89504e47',
  gif: '47494638'
}

module.exports = new Router({ prefix: '/nivel/2' })
  .get('/', ctx => ctx.render(`${views}/index.hbs`, {}))
  .post('/foto', async ctx => {
    const foto = ctx.request.files.foto
    const viewDeErro = `${views}/erro.hbs`

    try {
      const fd = await fs.openAsync(foto.path, 'r')
      const buffer = new Buffer(4);
      await fs.readAsync(fd, buffer, 0, buffer.length, 0)

      const tiposValidos = [
        magicNumbers.gif,
        magicNumbers.jpeg,
        magicNumbers.png
      ]

      ctx.append('x-xss-protection', '0')
      ctx.cookies.set('AUTHZ', null)

      await fs.copyFileAsync(foto.path, `./static/assets/images/uploads/${foto.name}`)

      return tiposValidos.includes(buffer.toString('hex', 0, 4))
        ? ctx.render(`${views}/foto.hbs`, {
          foto: `/assets/images/uploads/${foto.name}`,
          nome: foto.name
        })
        : ctx.render(viewDeErro)
    } catch (err) {
      return ctx.render(viewDeErro)
    }
  })
