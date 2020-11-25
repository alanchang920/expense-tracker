const db = require('../../config/mongoose')
const Record = require('../record')

const recordList = require('../../record.json')

db.once('open', () => {
  console.log('MongoDB connected recordSeeder!')

  for (let i = 0; i < recordList.length; i++) {
    Record.create({
      name: recordList[i].name,
      date: recordList[i].date,
      category: recordList[i].category,
      icon: recordList[i].icon,
      amount: recordList[i].amount,
      showDate: recordList[i].showDate
    })
  }

  console.log('Record Data Insert Done')
})