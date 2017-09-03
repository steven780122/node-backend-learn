// 載入express模組
const express = require('express')       // 這require寫法是node獨有，純javascript在前端的寫法沒有喔!
// 建立express中的Application物件
const app = express()

// 聆聽: http://localhost:3000
app.get('/', function (req, res) {    //如果使用者用get方法連線到跟目錄，執行如此
  res.send('Hello World!')
});

// 聆聽: http://localhost:3000/GetData
app.get('/GetData', function (req, res) {    //如果使用者用get方法連線到跟目錄，執行如此
    res.send('Data')
  });

// 啟動伺服器在port: 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});