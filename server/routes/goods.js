var express=require('express')
var router=express.Router();
var Goods=require('../models/goods')

router.get('/list',(req,res,next)=>{
    Goods.find({},(err,goods)=>{
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:{
                    goodsList:[]
                }
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    goodsList:goods
                }
            })
        }

    })
})

router.post('/add',(req,res,next)=>{
    new Goods({
        goodsName:"电视机",
        goodsPrice:5000,
        goodsImage:""
    }).save((err,goods)=>{
        if(err){
            res.json({
                status:'1',
                msg:err.message,
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                data:{
                    goods:goods
                }
            })
        }
    })
})

module.exports=router;

