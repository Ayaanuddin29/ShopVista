import React from 'react'
import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getProductById } from './actions/productActions';
import { addToCart } from './actions/cartActions';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Review from '../components/Review';
export default function Productdescription({match}) {
  const productid=match.params.id;
    const dispatch=useDispatch();
    const [quantity,setquantity]=useState(1)
    const getproductbyidstate=useSelector((state)=>state.getProductByIdReducer);
    const {product,loading,error}=getproductbyidstate;
    function addtocart(){
      dispatch(addToCart(product,quantity))
    }
    useEffect(()=>{
      dispatch(getProductById(productid)) 
    },[])
  return (
    <div>
    {loading?(<Loader/>):
    error?(<Error error={'something went wrong'}/>):
 (
  <div className='row'>
        <div className='col-md-6'>
            <div className='card p-5 m-3 shadow p-3 mb-5 bg-white rounded'>
                <h1 style={{fontSize:'20px'}}><b>{product.name}</b></h1><hr/>
                <img src={product.image} className='img-fluid m-3 big-image'/>
                <p>{product.description}</p>
            </div>
        </div>
        <div className='col-md-6 '>
            <div className='m-2 text-start shadow p-3 mb-5 bg-white rounded'>
               <h1><b>price:{product.price}</b></h1>
               <hr/>
               <h1 >Select Qty</h1>
               <select className='text-end' value={quantity} onChange={(e)=>{setquantity(e.target.value)}}>
               {[...Array(product.countInStock).keys()].map((x,i)=>{
                  return <option value={i+1}>{i+1}</option>
               })}
               </select>
               <hr/>
               {product.countInStock>0?( <button className='btn btn-dark btn-end' onClick={addtocart}>Add To Cart</button>):
              ( <div>
              <h1 style={{color:'red'}}>Out of Stock</h1>
                 <button className='btn btn-dark btn-end disabled'  onClick={addtocart}>Add To Cart</button>
               </div>
               )}
            </div>
            <hr/>
            <Review product={product}/>
        </div>
        </div>
 )}
    </div>
  )
}
