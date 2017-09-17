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
    var time = parseInt(req.query.time);                //把time query撈回
   
    var ref = admin.database().ref("comment_db");
    ref.orderByChild("time").startAt(time).once("value", function(snapshot){           //child_added只會有一條   value會全部， ref.once:立刻連線去資料     
                                                    // orderByChild("time")  因為我們有塞自己的時間!                    
                                                    //  只抓0以上的時間，time = 0是抓到所有的留言  (限制(startAt)一定要和排序(orderBy)一起寫)
        var value = snapshot.val();

        if(value==null){              //在這個邏輯會有可能一開始抓不到value所以要留意
            res.send({});
        }else{
            res.send(value);
        }

        // res.send(value);                            // server回給browser     //如果加了上面的判斷這裏要刪除!!
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