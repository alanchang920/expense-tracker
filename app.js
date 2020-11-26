const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const Category = require('./models/category')
const Record = require('./models/record')
const totalCalc = require('./public/javascripts/totalCalc')
const getIcon = require('./public/javascripts/iconType')


require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categoryies) => {
      categoryData = categoryies
    })
    .then(() => {

      return Record.find()
        .lean()
        .sort({ date: 'desc' })
        .then((records) => {

          return res.render('index', { records, categoryies: categoryData, totalAmount: totalCalc(records) })
        })
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
})

app.get('/records/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categoryies) => {
      categoryData = categoryies
      return res.render('new', { categoryies: categoryData })
    })
    .catch((error) => console.log(error))
})

app.post('/', (req, res) => {
  const options = req.body
  options.icon = getIcon(req.body.category)
  options.showDate = options.date.replace(/-/g, '/')
  const recordAddNew = new Record(options)
  return recordAddNew.save()
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

app.listen(port, () => {
  console.log(`Express in listening on http://localhost:${port}`)
})