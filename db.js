const mongoose=require('mongoose');

const mongoDBURL='mongodb+srv://Ayaanuddin_29:f8YJBPky0hXa8Qnn@cluster0.acspcpb.mongodb.net/e-commerce'

mongoose.connect(mongoDBURL,{useUnifiedTopology:true,useNewUrlParser:true});
var dbconnect=mongoose.connection
dbconnect.on('error',()=>{
    console.log("mongodb connection is falied");
})
dbconnect.on('connected',()=>{
    console.log('connected to mongodb successfull')
})
module.exports=mongoose;