const mongoose = require('mongoose')
const SChema = mongoose.Schema

const categorySchema = new SChema({
  category: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  tempCategory: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Category', categorySchema)