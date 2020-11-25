const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const Category = require('./models/category')
const Record = require('./models/record')
const totalCalc = function calcTotal(options) {
  let totalAmount = 0
  options.forEach((item) => {
    totalAmount += Number(item.amount)
  })

  return totalAmount
}

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  // 取出 category model 所有資料
  Category.find()
    .lean()  // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })  // 排序(順)
    .then((categoryies) => {
      categoryData = categoryies
    })
    .then(() => {
      // 取出 Record model 所有資料
      return Record.find()
        .lean()  // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .sort({ date: 'desc' })  // 排序(反)
        .then((records) => {
          // 將資料傳給 index 樣板
          return res.render('index', { records, categoryies: categoryData, totalAmount: totalCalc(records) })
        })
        .catch((error) => console.log(error))  // 錯誤處理  
    })
    .catch((error) => console.log(error))  // 錯誤處理  
})


app.listen(port, () => {
  console.log(`Express in listening on http://localhost:${port}`)
})