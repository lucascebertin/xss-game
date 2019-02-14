const db = require('./infra/db')
const app = require('./app')

const port = app.env.PORT || 1337

db.then(connection => {
  app.context.db = connection

  app.listen(port, () =>
    console.log(`Application listening on ${port}`))
}).catch(console.error)
