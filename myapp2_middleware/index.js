let express = require('express')
let app = express()

// 建立中介函式  (順序有意義!!! 上下順序有差!!!)
app.use(express.static("www"));       //也是中介函式
app.use(function(req, res, next){   // 一定要這3個參數，next是指到下一個中介函數的參考!
    console.log("中介函式啟動");
    next(); //呼叫下一個中介函式，沒有就沒有
});

// 建立中介函式
app.use(function(req, res, next){
    console.log("中介函式啟動2");
    next(); //呼叫下一個中介函式，沒有就沒有
});


// 建立中介函式 連線到localhost:30000/users/XXXX
app.use("/users", function(req, res, next){      //這種仲介是在如果連線到users開頭才會用到該中介函式
    console.log("users中介函式啟動");
    next(); //呼叫下一個中介函式，沒有就沒有
});

app.get('/hello', function (req, res) {
    res.send('Hello World!')
  })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})