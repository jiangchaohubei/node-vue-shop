var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var goodsSchema=new Schema({
    goodsName:String,
    goodsPrice:Number,
    goodsImage:String
})

module.exports=mongoose.model('Good',goodsSchema);