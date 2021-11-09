//step 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()

// 設定首頁路由
// app.get('/', (req, res) => {
//   res.render('index')
// })

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

require('./config/mongoose')







//---
//step handlebars
const exphbs = require('express-handlebars')

//建立一個名為 hbs的樣板引擎，並傳入 exphbs與相關參數
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
//設定 extname: '.hbs'，才能把預設的長檔名改寫成短檔名。


//啟用樣板引擎 hbs
app.set('view engine', 'hbs')



//------
//-- 後面step 但需要網上放

// 屬於 step Create階段，因程式碼要在.get等資料之前，固往前移
// 引用 body-parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({
  extended: true
}))

// 重構路由語意化 step
// 載入 method-override
const methodOverride = require('method-override')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

//---
//重構路由
// 引用路由器
const routes = require('./routes')
// 將 request 導入路由器
app.use(routes)

