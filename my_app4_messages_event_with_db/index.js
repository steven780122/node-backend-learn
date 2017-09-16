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

// 操作資料庫
let database = admin.database();

// 讀取
let ref = database.ref("/messages")

// ------------------------------------------
// 最終如果要使用留言板，我們把拿到的訊息放到全域陣列裡(server開著就會存在，)
// 這是一思考而已，當然也可以項傳統每一次傳進來都去資料庫拿!
let messages = []
ref.on("value", function(snapshot){
    let value = snapshot.val();
    messages.push(value)
    console.log(value);
    console.log("=======================================")
}, function(errors){   //失敗
    console.log(errors);
});

app.get("/", function(req, res){     //如此的模式，是一種可考慮的pattern，因為資料庫隨時都準備好，messages陣列都準備好，使用者連上後只是去拿到
                                    // messages陣列資料，並沒有去讀資料庫喔!!
    res.send(messages)
});


// ------------------------------------------
// 利用child_added事件一個一個讀近來，如果有變更也只會讀進最新的那一筆喔!!!
// ref.on("child_added", function(snapshot){
//     let value = snapshot.val();
//     console.log(value);
//     console.log("=======================================")
// }, function(errors){   //失敗
//     console.log(errors);
// });


// ------------------------------------------
// 若想要排序   有很多種orderbyXXXX
// ref.orderByKey().on("child_added", function(snapshot){
//     let value = snapshot.val();
//     console.log(value);
//     console.log("=======================================")
// }, function(errors){   //失敗
//     console.log(errors);
// });

// ------------------------------------------
// 若想要排序   有很多種orderbyXXXX
// ref.orderByChild("author").on("child_added", function(snapshot){
//     let value = snapshot.val();
//     console.log(value);
//     console.log("=======================================")
// }, function(errors){   //失敗
//     console.log(errors);
// });


// ------------------------------------------
// 若想要簡單的搜尋! 可以:
// ref.orderByChild("author").equalTo("Steven").on("child_added", function(snapshot){
//     let value = snapshot.val();
//     console.log(value);
//     console.log("=======================================")
// }, function(errors){   //失敗
//     console.log(errors);
// });

// ------------------------------------------

// 成功取得資料，得到snapshot物件
// ref.on("value", function(snapshot){     //聆聽value事件並一次抓回完整的資料
//     let value = snapshot.val();
//     console.log(value);

// }, function(errors){   //失敗
//     console.log(errors);
// });

// -------------------------------------------------
// ref.once("value", function(snapshot){    //假設不想用聆聽的方式只要改變就重新再跑一次，則使用once
//     let value = snapshot.val();
//     console.log(value);

// }, function(errors){   //失敗
//     console.log(errors);
// });


// 再放一個新的資料，但其實是幾乎在同一時間發出這2個request 來push，也可以用timeout來等上一個做完來側，此5秒後再push
/*setTimeout(function(){
    ref.push({     
        content: 'Test Firebase', author: 'Jack',  
        time:(new Date()).getTime()
    }, function(errors){
        if(errors){
            console.log("Error");
        }else{
            console.log("Success");
        }
    });

}, 5000);    */


// -------------------------------------------------------------------





// 寫DB
// let ref = database.ref("/user")
// ref.set({     // 寫進DB
//     name: 'ply', email:'ply@aaa.com'
// }, function(errors){
//     if(errors){
//         console.log("Error");
//     }else{
//         console.log("Success");
//     }
// });

// ref.update({     // 更新DB
//     name: 'abc', time:(new Date()).getTime()
// }, function(errors){
//     if(errors){
//         console.log("Error");
//     }else{
//         console.log("Success");
//     }
// });



// push
// let ref = database.ref("/messages")
// ref.push({     // 更新DB
//     content: 'Welcome', author: 'Jack',  
//     time:(new Date()).getTime()
// }, function(errors){
//     if(errors){
//         console.log("Error");
//     }else{
//         console.log("Success");
//     }
// });




// 如果要更新某個message
// 但通常你會用code去取得中間那個key
// let ref = database.ref("/messages/-Ku90rKD3DuZdFg0Ot4V/author");
// ref.set("Steven Hsiao", function(errors){
//     if(errors){
//         console.log("Error");
//     }else{
//         console.log("Success");
//     }
// });



// 刪除資料
// let ref = database.ref("/messages/-Ku90rKD3DuZdFg0Ot4V/");
// ref.remove(function(errors){
//     if(errors){
//         console.log("Error");
//     }else{
//         console.log("Success");
//     }
// });


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
