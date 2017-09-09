let express = require("express");
let app = express();

// 中介函式，會先進入這裡才會繼續做其他的(例如可以用在log)
let middle = function(req, res, next){
    console.log("Middleware Run");
    next();
};
app.use(middle)
app.get("/test_middle", function(req, res){
    res.send("GOO!!!!!!")
});




app.use(express.static("www"))    // 設定資料夾www為靜態檔案的資料夾

let hello = require("./module.js")  // 如果想直接檔名不要./，則要把檔案放到node_modules資料夾
// 啟動伺服器在 localhost:3000
// 如果要上線不是要測試可以打80，使用者就不用再打port
app.listen(3000, function(){   
    // 伺服器啟動成功的回呼函式
    console.log("伺服器啟動成功");
});   

// 可以再接message等
// http://localhost:3000/users/Steven
app.get("/users/:user", function(req, res){
    res.send(hello(req.params.user))
});


// 處理客戶的要求，取得Request物件和Response物件
app.get("/test", function(req, res){
    // res.send(hello("Steven"));    //印出 Hello Steven

    // // 取得標準http 參數
    // res.send(hello(req.query.name))

    // //取得主網址後path
    // res.send(req.path)

    // // 取得Request Header!!
    // let lang = req.get("Accept-Language");
    // res.send(lang)


    // res.download("./package.json")


    // let data = ["Hello", "World"]
    // let data2 = {x:100, y:50}
    // res.json(data2)


    // // 設定Response Header (可以觀察設前設後開發者工具變化)
    // res.set("Content-Type", "text/plain")  // 這樣的話就不會把tag當作html的格式來處理，會變純文字

    // // 設定HTTP Status Code
    // res.status(404).send("404 Error!")

});
