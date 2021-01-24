const express = require('express')
const router = express.Router()

const totalAmount = require('../../public/javascripts/totalAmount')
const translate = require('../../public/javascripts/translate')

const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const total = totalAmount(records)
      res.render('index', { records, total })
    })
    .catch(error => console.log(error))
})

router.get('/filter/:category', (req, res) => {
  const userId = req.user._id
  const category = req.params.category
  const ch_category = translate(category)
  Record.find({ category, userId })
    .lean()
    .then(records => {
      const total = totalAmount(records)
      res.render('index', { records, total, ch_category })
    })
    .catch(error => console.log(error))
})

module.exports = router
