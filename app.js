// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose


const app = express()

mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})



// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

//---
//handlebars
const exphbs = require('express-handlebars')

//建立一個名為 hbs的樣板引擎，並傳入 exphbs與相關參數
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
//設定 extname: '.hbs'，才能把預設的長檔名改寫成短檔名。



//啟用樣板引擎 hbs
app.set('view engine', 'hbs')