let express = require('express')
let app = express()
let parser = require("body-parser")

// 初始化firebase
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");    // 改成自己的路徑

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),    //告訴google你是誰
  databaseURL: "https://node-backend-train.firebaseio.com"
});


// 建立中介函式  (順序有意義!!! 上下順序有差!!!)
app.use(parser.urlencoded({extended:true}));
app.use(express.static("www"));       //也是中介函式

// 改用POST
app.post('/save', function (req, res) {
    console.log(req.body.data);                 // 把原本get的query改為body !!!
    
    // 存進資料庫
    let database = admin.database();   //開啟資料庫
    let ref = database.ref("/messages");  //取得參考路徑    放在message裡面

    // 儲存資料!
    ref.set(req.body.data, function(error){    //有一個call back確認是否成功!!!
        if(error){
            res.send("Failed!!")
        }
        else{
            res.send("Saved!!")
        }
    });
    
    // res.send('OK'); //會中斷連線
  })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})




// app.use(function(req, res, next){   // 一定要這3個參數，next是指到下一個中介函數的參考!
//     console.log("中介函式啟動");
//     next(); //呼叫下一個中介函式，沒有就沒有
// });

// // 建立中介函式
// app.use(function(req, res, next){
//     console.log("中介函式啟動2");
//     next(); //呼叫下一個中介函式，沒有就沒有
// });


// // 建立中介函式 連線到localhost:30000/users/XXXX
// app.use("/users", function(req, res, next){      //這種仲介是在如果連線到users開頭才會用到該中介函式
//     console.log("users中介函式啟動");
//     next(); //呼叫下一個中介函式，沒有就沒有
// });