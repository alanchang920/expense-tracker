const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList = require('../../category.json')

db.once('open', () => {
  console.log('MongoDB connected category!')

  const promise = []
  for (let i = 0; i < categoryList.length; i++) {
    promise.push(
      Category.create({
        category: categoryList[i].category,
        categoryName: categoryList[i].categoryName,
        url: categoryList[i].url,
        icon: categoryList[i].icon,
        tempCategory: categoryList[i].tempCategory
      })
    )
  }
  Promise.all(promise).then(() => {
    db.close()
  })

  console.log('Category Data Insert Done')
})