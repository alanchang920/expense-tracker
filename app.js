const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000

const Category = require('./models/category')
const Record = require('./models/record')
const totalCalc = require('./public/javascripts/totalCalc')
const getIcon = require('./public/javascripts/iconType')
let categoryData = []


require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

handlebars.registerHelper('if_equal', function (job, expectedJob, options) {
  if (job === expectedJob) {
    return options.fn(this);
  }
  return options.inverse(this);
})

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

app.get('/:keyword', (req, res) => {
  const keyword = req.params.keyword
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      records = records.filter((item) => {
        return item.category === keyword
      })

      return res.render('index', { records, categoryies: categoryData, totalAmount: totalCalc(records) })
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

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categoryies) => {
      categoryData = categoryies
    })
    .then(() => {
      return Record.findById(id)
        .lean()
        .then((record) => {
          categoryData.forEach((item) => {
            item.tempCategory = record.category
          })

          return res.render('edit', { record, categoryies: categoryData })
        })
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
})



app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const options = req.body

  options.icon = getIcon(req.body.category)
  options.showDate = options.date.replace(/-/g, '/')

  return Record.findById(id)
    .then((record) => {
      record = Object.assign(record, options)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

app.listen(port, () => {
  console.log(`Express in listening on http://localhost:${port}`)
})