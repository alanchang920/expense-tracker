const db = require('../../config/mongoose')
const Category = require('../category')

db.once('open', () => {
  console.log('db connected! start seeding...')

  Category.create(
    {
      category: 'living',
      icon: 'fas fa-home'
    },
    {
      category: 'traffic',
      icon: 'fas fa-shuttle-van'
    },
    {
      category: 'entertainment',
      icon: 'fas fa-grin-beam'
    },
    {
      category: 'food',
      icon: 'fas fa-utensils'
    },
    {
      category: 'others',
      icon: 'fas fa-pen'
    }
  )

    .then(() => db.close())
})