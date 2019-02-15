const Router = require('koa-router')
const views = 'nivel/3/anotacao/views'
const criarModelDeAnotacoes = require('./Anotacao')
const criarModelDeUsuarios = require('../usuario/Usuario')
const middleware = require('../autenticacao/middleware/autenticacao')

module.exports = new Router({ prefix: '/nivel/3/anotacao' })
  .get('/criar', middleware, ctx => ctx.render(`${views}/cadastrar.hbs`))
  .get('/', middleware, async ctx => {
    const Anotacao = criarModelDeAnotacoes(ctx.db)
    const id = ctx.params.usuario.id

    const anotacoes = await Anotacao.find({
      usuario: id
    })

    const minhasAnotacoes = anotacoes.map(x => ({
      ...x._doc,
      descricao: x._doc.descricao.length > 50
        ? `${x._doc.descricao.substring(0, 50)}...`
        : x._doc.descricao,
      compartilhado: x._doc.compartilhamentos &&
        x._doc.compartilhamentos.length > 0
        ? 'Sim'
        : 'Não'
    }))


    const compartilhadosComigo = await (Anotacao.find({
      compartilhamentos: { $elemMatch: { usuario: id } }
    })
    .populate('usuario')
    .exec())

    return ctx.render(`${views}/index.hbs`, {
      anotacoes: minhasAnotacoes,
      compartilhamentos: compartilhadosComigo
     })
  })
  .get('/:id', middleware, async ctx => {
    const Anotacao = criarModelDeAnotacoes(ctx.db)
    const anotacao = await (Anotacao.findById(ctx.params.id)
      .populate('compartilhamentos.usuario')
      .exec())

    if(anotacao === null || anotacao === undefined)
      return ctx.render(`${views}/erro.hbs`)

    const id = ctx.params.usuario.id
    const proprietario = anotacao.usuario._id.toString() === id

    if(!proprietario && anotacao.compartilhamentos) {
      const idDoCompartilhamento = anotacao.compartilhamentos
        .findIndex(x => x.usuario.toString() === id)

      if(idDoCompartilhamento >= 0) {
        anotacao.compartilhamentos[idDoCompartilhamento].lido = true
        await anotacao.save()
      }
    }

    return ctx.render(`${views}/anotacao.hbs`, {
      titulo: anotacao.titulo,
      descricao: anotacao.descricao,
      id: anotacao._id,
      proprietario,
      compartilhamentos: anotacao.compartilhamentos.map(x => ({
        id: x.usuario._id,
        email: x.usuario.email,
        lido: x.lido ? 'Sim' : 'Não'
      }))
    })
  })
  .get('/:id/compartilhar', middleware, async ctx => {
    const Anotacao = criarModelDeAnotacoes(ctx.db)
    const anotacao = await Anotacao.findById(ctx.params.id)

    return ctx.render(`${views}/compartilhar.hbs`, { id: anotacao._id})
  })
  .post('/:id/compartilhar', middleware, async ctx => {
    const Anotacao = criarModelDeAnotacoes(ctx.db)
    const Usuario = criarModelDeUsuarios(ctx.db)

    const email = ctx.request.body.email
    if(email === null || email === '')
      return ctx.render(`${views}/erro.hbs`)

    const anotacao = await Anotacao.findById(ctx.params.id)

    if(anotacao === null)
      return ctx.render(`${views}/erro.hbs`)

    const usuario = await Usuario.findOne({
      email,
      _id: { $ne: ctx.params.usuario.id }
    })

    if(usuario === null)
      return ctx.render(`${views}/erro.hbs`)

    const usuarioJaCompartilhado = anotacao.compartilhamentos
      .find(c => c.usuario === usuario._id)

    if(usuarioJaCompartilhado !== null && usuarioJaCompartilhado !== undefined)
      return ctx.render(`${views}/erro.hbs`)

    anotacao.compartilhamentos.push({
      usuario: usuario._id,
      lido: false
    })

    await anotacao.save()
    return ctx.redirect('/nivel/3/anotacao/')
  })
  .post('/', middleware, async ctx => {
    const Anotacao = criarModelDeAnotacoes(ctx.db)

    const titulo = ctx.request.body.titulo
    const descricaoHTML = ctx.request.body.descricao

    if(titulo === null || titulo === '')
      return ctx.render(`${views}/erro.hbs`)

    if(descricaoHTML === null || descricaoHTML === '')
      return ctx.render(`${views}/erro.hbs`)

    await Anotacao.create({
      usuario: ctx.params.usuario._id,
      titulo,
      descricao: descricaoHTML,
      compartilhamentos: []
    })

    return ctx.redirect('/nivel/3/anotacao/')
  })
