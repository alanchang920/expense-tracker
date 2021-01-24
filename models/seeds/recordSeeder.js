if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'alan',
  email: 'alan@example.com',
  password: '123'
}

db.once('open', () => {
  console.log('MongoDB connected recordSeeder!')
  const newUser = []

  const { name, email } = SEED_USER
  newUser.push(
    User.find({ email: SEED_USER.email })
      .then(user => {
        if (user.length !== 0) {
          return
        }
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(SEED_USER.password, salt))
          .then(hash => {
            return User.create({ name, email, password: hash })
          })
      })
  )
  Promise.all(newUser).then(() => {
    const newRecord = []
    newRecord.push(
      User.findOne({ email })
        .then(user => {
          const userId = user._id
          return Record.create(
            {
              name: '午餐',
              category: '餐飲食品',
              date: '202-01-18',
              amount: 60,
              merchant: '美食街',
              icon: '<i class="fas fa-utensils"></i>',
              userId
            },
            {
              name: '晚餐',
              category: '餐飲食品',
              date: '2020-01-19',
              amount: '800',
              merchant: '馬辣',
              icon: '<i class="fas fa-utensils"></i>',
              userId
            },
            {
              name: '電影',
              category: '休閒娛樂',
              date: '2020-02-28',
              amount: 300,
              merchant: '威秀',
              icon: '<i class="fas fa-grin-beam"></i>',
              userId
            },
            {
              name: '加油',
              category: '交通出行',
              date: '2020-03-19',
              amount: '1600',
              merchant: '中油',
              icon: '<i class="fas fa-shuttle-van"></i>',
              userId
            },
            {
              name: '房租',
              category: '家居物業',
              date: '2020-04-23',
              amount: 16000,
              merchant: '其他',
              icon: '<i class="fas fa-home"></i>',
              userId
            }
          )
        })
    )
    Promise.all(newRecord).then(item => {
      process.exit()
    })
  })
})
