const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const getIcon = require('../../public/javascripts/iconType')
let categoryData = []


router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categoryies) => {
      categoryData = categoryies

      return res.render('new', { categoryies: categoryData })
    })
    .catch((error) => console.log(error))
})

router.post('/', (req, res) => {
  const options = req.body

  options.icon = getIcon(req.body.category)
  options.showDate = options.date.replace(/-/g, '/')

  const recordAddNew = new Record(options)

  return recordAddNew.save()
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

router.get('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
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


// 確定刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router