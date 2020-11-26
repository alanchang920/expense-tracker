const express = require('express')
const router = express.Router()


const Record = require('../../models/record')
const Category = require('../../models/category')

const totalCalc = require('../../public/javascripts/totalCalc')
let categoryData = []

router.get('/', (req, res) => {
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

router.get('/:keyword', (req, res) => {
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

module.exports = router