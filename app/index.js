const app = require('./app')
const port = app.env.PORT || 1337

app.listen(port, () =>
  console.log(`Application listening on ${port}`))
