var mongoose=require('mongoose')
var Goods=require('./../models/goods')
var User=require('./../models/user')
var fs=require('fs')

var goodsList=JSON.parse(fs.readFileSync("./goods.json")).data
var userList=JSON.parse(fs.readFileSync("./user.json")).data

mongoose.connect('mongodb://127.0.0.1:27017/shop',(err,db)=>{
      if(!err){
              Goods.collection.insert(goodsList, (err,docs)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log("goods初始化数据完成")
                    }
              });
              User.collection.insert(userList, (err,docs)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log("user初始化数据完成")
                    }
              });
          }else{
              console.log('数据库连接失败')
          }
});

