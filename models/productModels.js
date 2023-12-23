const mongoose=require('mongoose');
const reviewSchema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId
    },
    name:{
        type:String,
        required:true
    },
    comment:{
        type:String
    },
    rating:{
        type:Number,
        required:true
    }
},{
    timeStamps:true
})
const proudctSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
      type:Number,
      required:true
    },
    countInStock:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    reviews:[reviewSchema]
},{
    timeStamps:true
})

const Proudct=mongoose.model('product',proudctSchema);
module.exports=Proudct;