const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const methodOverride = require('method-override')

const routes = require('./routes/index')

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

handlebars.registerHelper('ifEqual', function (category, targetCategory, options) {
  if (category === targetCategory) {
    return options.fn(this)
  }
  return options.inverse(this)
})

app.listen(port, () => {
  console.log(`Express in listening on http://localhost:${port}`)
})