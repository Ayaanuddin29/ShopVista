const router=require('express').Router();
const stripe=require('stripe')('sk_test_51OJ8FeSBPzK9VO5A1bvmFX5WE6oE2KRF4Y2OuCDHQ009FOrr8wSWQXEWo4I7XWx2kUBsa3t7tCvZjubV2PR2rgUV00F9KuJxcC')
const {v4:uuidv4}=require('uuid')
const Order=require('../models/orderModel')
router.post('/placeorder',async(req,res)=>{
    const {token,cartItems,currentUser,subtotal}=req.body
   
    const customer=await stripe.customers.create({
        email:token.email,
        source:token.id
    }) 
    const payment=await stripe.paymentIntents.create({
       amount:subtotal*100,
       currency:'inr',
       customer:customer.id,
       receipt_email:token.email
    },{
    idempotencyKey:uuidv4()})

    if(payment){
        const order=new Order({
            userid:currentUser._id,
            name:currentUser.name,
            email:currentUser.email,
            orderItems:cartItems,
            shippingAddress:{
                address:token.card.address_line1,
                city:token.card.address_city,
                country:token.card.address_country,
                postalCode:token.card.address_zip
            },
            orderAmount:subtotal,
            transactionId:payment.id,
            isDelivered:false
        })
       try{
      await order.save();
      res.status(200).send('Order Placed')
       }
       catch(err){
        console.log(err);
        res.status(500).send('Internal server Error');
       }
       
    }
    else{
        res.status(404).send('payment failed')
    }
})

router.post('/getordersbyuserid',async(req,res)=>{
    try{
        const userid=req.body.userid;
        const docs= await Order.find({userid:userid}).exec();
        res.send(docs);
    }
    catch(err){
        res.status(400).json({error:'something went wrong',message:'something went wrong'});
    }
})
router.post('/getorderbyid',async(req,res)=>{
    try{
        const orderid=req.body.orderid;
        const docs= await Order.find({_id:orderid}).exec();
        res.send(docs[0]);
    }
    catch(err){
        res.status(400).json({error:'something went wrong',message:'something went wrong'});
    }
})

router.get('/getallorders',async(req,res)=>{
    try{
      const docs=await Order.find({})
      if(docs){
        res.send(docs);
      }
      else{
        return res.status(400).json({message:'something went wrong'})
      }
    }
    catch(err){
       res.status(500).json({message:'Internal server'})
    }
})

module.exports=router