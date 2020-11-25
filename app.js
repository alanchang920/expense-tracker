const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000


require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express in listening on http://localhost:${port}`)
})