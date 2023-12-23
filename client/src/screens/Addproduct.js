import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from './actions/productActions';
import Success from '../components/Success'
import  Error  from '../components/Error';
import Loader from '../components/Loader'

export default function Addproduct() {
  const [name,setname]=useState('');
  const [price,setprice]=useState();
  const [countinstock,setcountinstock]=useState();
  const [imgurl,setimgurl]=useState('');
  const [category,setcategory]=useState('');
  const [description,setdescription]=useState('')
  const dispatch=useDispatch();
  const addproductstate=useSelector(state=>state.addProductReducer);
  const {success,error,loading}=addproductstate||{}
  const addproduct=(e)=>{
    e.preventDefault();
    const product={
      name:name,
      price:price,
      countInStock:countinstock,
      image:imgurl,
      description:description,
      category,
    }
    dispatch(addProduct(product))
    // console.log(product)
  }
  return (
    <div>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
        <h2>Add Product</h2>
        {loading &&(<Loader />)}
    {success && (<Success success='your order placed successfully'/>) }
    {error && (<Error error='something went wrong'/> )}
        <form onSubmit={addproduct}>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='enter the name of the product' required value={name} onChange={(e)=>setname(e.target.value)}/>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='enter the price of the product' required value={price} onChange={(e)=>setprice(e.target.value)}/>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='enter the description of the product' required value={description} onChange={(e)=>setdescription(e.target.value)}/>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='Drop the image URL' required value={imgurl} onChange={(e)=>setimgurl(e.target.value)}/>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='enter the category of the product' required value={category} onChange={(e)=>setcategory(e.target.value)}/>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='enter the countinstock of the product' required value={countinstock} onChange={(e)=>setcountinstock(e.target.value)}/>
           
           <button className='btn mt-5' type='submit' style={{float:'left'}}>
            Add Product
           </button></form>
        </div>
      </div>
    </div>
  )
}
