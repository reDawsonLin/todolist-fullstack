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



//step mongoose
const mongoose = require('mongoose') // 載入 mongoose

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

// 屬於 step Create階段，因程式碼要在.get等資料之前，固往前移
// 引用 body-parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({
  extended: true
}))


//---
//step CRUD action
const Todo = require('./models/todo')

app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', {
      todos
    })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})




//---
//step Create todo
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({
      name
    })
    .then((() => res.redirect('/')))
    .catch(error => console.log(error))
})

//-----
//step 瀏覽特定 todo
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', {
      todo
    }))
    .catch(error => console.log(error))
})

//---
// step 修改特定 todo
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

//---
// step 刪除特定 todo
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})