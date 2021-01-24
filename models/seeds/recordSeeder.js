const db = require('../../config/mongoose')

const records = require('./record.json')

const Record = require('../record')

db.once('open', () => {
  console.log('db connected! start seeding...')

  Record.create(records.result)
    .then(() => db.close())
})