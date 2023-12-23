const mongoose=require('mongoose');
const orders=mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    orderItems:[{
        name:{type:String,requied:true},
        quantity:{type:Number,required:true},
        price:{type:Number,required:true},
        _id:{type:String,required:true}
       
    }],
    shippingAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        country:{type:String,required:true},
        postalCode:{type:Number,required:true}
    },
    orderAmount:{type:Number,required:true},
    transactionId:{type:String,required:true},
    isDelivered:{type:Boolean,required:true},

},{
    timestamps:true
})
const Order=mongoose.model('orders',orders)
module.exports=Order