const router=require('express').Router();
const Proudct = require('../models/productModels');
const Product=require('../models/productModels')

router.get('/getallproduct',async(req,res)=>{
  try {
    const docs = await Product.find({});
    return res.send(docs);
  } catch (err) {
    return res.status(404).json({ message: "Something went wrong" });
  }
});

router.post('/getproductbyid',async(req,res)=>{
try{
  const product=await Product.find({_id:req.body.productid});
  if(product){
    res.send(product[0]);
    
  }
  else{
    res.status(404).json({message:"Product not found"})
  }
}
catch(err){
  res.status(400).json({message:"something went wrong"})
}
})

router.post('/addreview',async(req,res)=>{
  const {review,productid,currentUser}=req.body;
 const product=await Product.findById({_id:productid});
const reviewmodel={
  name:currentUser.name,
  userid:currentUser._id,
  rating:review.rating,
  comment:review.comment
}
product.reviews.push(reviewmodel);
var rating=product.reviews.reduce((acc,x)=>acc+x.rating,0)/product.reviews.length;
product.rating=rating
product.save()
})

router.post('/deleteproduct',async(req,res)=>{
  try{
   await Product.findByIdAndDelete(req.body.productid)
   res.send('product deleted successfully')
  }
  catch(err){
    res.status(400).json({message:'something went wrong'})
  }
})

router.post('/addproduct',(req,res)=>{
  const {product}=req.body
  console.log(product)
  const productModel=new Product({
    name:product.name,
    price:product.price,
    countInStock:product.countInStock,
    image:product.image,
    category:product.category,
    description:product.description
  })
  productModel.save()
})

router.post('/updateproduct', async (req, res) => {
  try {
    const updatedProduct = req.body.updatedproduct;
    const productId = req.body.productid;

    // Using async/await to make the code cleaner
    await Product.findByIdAndUpdate(productId, {
      name: updatedProduct.name,
      price: updatedProduct.price,
      category: updatedProduct.category,
      countInStock: updatedProduct.countInStock,
      description: updatedProduct.description,
      image: updatedProduct.image
    });

    // Sending a success response
    res.send('Updating the Product Successfully');
  } catch (error) {
    // Handling errors and sending an error response
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
module.exports=router;