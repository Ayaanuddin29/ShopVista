const express=require('express');
const bodyParser=require('body-parser')
const path=require('path');
const app=express();
var dbconnection=require('./db')
var orderRoute=require('./routes/orderRoute')
var productRoute=require('./routes/productRoute');
var userRoute=require('./routes/userRoute')
app.use(bodyParser.json())
app.use('/api/orders/',orderRoute)
app.use('/api/product/',productRoute)
app.use('/api/users/',userRoute)
app.use(express.static(path.join(__dirname,'./client/build')))
if(process.env.NODE_ENV==='production'){
   app.use('/',express.static('client/build')) 
   app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client/build/index.html'))
   })
}
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
   })
const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`server is listening at ${port}`)
})