let express = require('express')
let app = express()
let parser = require("body-parser")

app.use(express.static("www"))
app.use(parser.urlencoded({extended:true}))   //中介函式，幫我們把post的body處理好，這樣在接收的時候比較方便!


// 初始化firebase
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");    // 改成自己的路徑
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),    //告訴google你是誰
  databaseURL: "https://node-backend-train.firebaseio.com"
});

app.get("/get", function(req, res){
    var ref = admin.database().ref("comment_db");
    ref.once("value", function(snapshot){           //child_added只會有一條   value會全部， ref.once:立刻連線去資料
        var value = snapshot.val();
        res.send(value);                            // server回給browser
    }, function(error){
        if(error){
            res.send("Error!")
        }
    });                     
});



// 用post方法處理 /post路徑
app.post("/post", function(req, res){
    var name = req.body.name;
    var content = req.body.content;
    // console.log(name, content);
    // res.send(name);
    
    // 把資料準備塞到firebase的DB- comment_db中
    var ref = admin.database().ref("comment_db");
    ref.push({
        name: name,
        content: content,
        time: (new Date()).getTime()
    }, function(errors){
        if(errors){
            res.send("Error!");
        }else{
            res.send("Success!");
        }
    });

});



// 使用者看到的網頁: localhost:3000/comment.htm
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })