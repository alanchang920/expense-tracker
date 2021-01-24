const express = require('express')
const router = express.Router()

const Record = require('../../models/record')


const generateIcon = require('../../public/javascripts/icon')



router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})


router.get('/new', (req, res) => {
  res.render('new')
})


router.post('/', (req, res) => {
  const record = req.body
  const name = record.name
  const date = record.date
  const category = record.category
  const amount = record.amount
  const icon = generateIcon(category)
  const userId = req.user._id
  Record.create({
    name,
    date,
    category,
    amount,
    icon,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  req.body.icon = generateIcon(req.body.category)
  Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router