var express=require('express')
var router=express.Router();
var Goods=require('../models/goods')

router.get('/list',(req,res,next)=>{
    let page=parseInt(req.param('page'));
    let limit=parseInt(req.param('pageSize'));
    let skip=(page-1)*limit;
    let sort=req.param("sort");
    let priceArea=req.param("priceArea");
    let priceGt='',priceLte='';
    let params={}
    if(priceArea!='all'){
           switch (priceArea){
                     case '0':priceGt = 0;priceLte=100;break;
                     case '1':priceGt = 100;priceLte=500;break;
                     case '2':priceGt = 500;priceLte=1000;break;
                     case '3':priceGt = 1000;priceLte=5000;break;
                   }
           params = {
             salePrice:{
                 $gt:priceGt,
                 $lte:priceLte
             }
           }
    }

    let query=Goods.find(params).skip(skip).limit(limit);
    query.sort({'salePrice':sort});
    query.exec((err,goods)=>{
            if(err){
                        res.json({
                            status:'1',
                            msg:err.message,
                            result:{}
                        })
                    }else{
                        res.json({
                            status:'0',
                            msg:'',
                            result:{
                                goodsList:goods,
                                count:goods.length
                            }
                        })
                    }
    })

})

//加入到购物车
router.post("/addCart", (req,res,next)=> {
  var userId = '100000077',productId = req.body.productId;
  var User = require('../models/user');
  User.findOne({userId:userId}, function (err,userDoc) {
    if(err){
        res.json({
            status:"1",
            msg:err.message
        })
    }else{
        console.log("userDoc:"+userDoc);
        if(userDoc){
          var goodsItem = '';
          userDoc.cartList.forEach(function (item) {
              if(item.productId == productId){
                goodsItem = item;
                item.productNum ++;
              }
          });
          if(goodsItem){
            userDoc.save(function (err2,doc2) {
              if(err2){
                res.json({
                  status:"1",
                  msg:err2.message
                })
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'suc'
                })
              }
            })
          }else{
            Goods.findOne({productId:productId}, function (err1,doc) {
              if(err1){
                res.json({
                  status:"1",
                  msg:err1.message
                })
              }else{
                if(doc){
                  doc.productNum = 1;
                  doc.checked = 1;
                  userDoc.cartList.push(doc);
                  userDoc.save(function (err2,doc2) {
                    if(err2){
                      res.json({
                        status:"1",
                        msg:err2.message
                      })
                    }else{
                      res.json({
                        status:'0',
                        msg:'',
                        result:'suc'
                      })
                    }
                  })
                }
              }
            });
          }
        }
    }
  })
});


module.exports=router;

