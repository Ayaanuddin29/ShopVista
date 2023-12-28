import React from 'react'
import { useDispatch,useSelector,useState } from 'react-redux'
import { addToCart,deleteFromCart } from './actions/cartActions';
import Checkout from '../components/Checkout';
export default function Cartscreen() {
    const cartreducerstate=useSelector(state=>state.cartReducer);
    const dispatch=useDispatch();
    const {cartItems}=cartreducerstate;
    var subtotal=cartItems.reduce((acc,item)=>acc+(item.price*item.quantity),0)
  return (
    <div className='cart'>
   
     <div className='row mt-5 justify-content-center'>
       <div className='col-md-8 card text-center shadow p-3 mb-5 bg-white rounded'>
       <h1 className='text-center m-5'>MY CART</h1>
       <div className='table-responsive'>
         <table className='table table-bordered table-responsive'>
           <thead>
           <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Delete</th>
            </tr>
           </thead>
           <tbody>
            {cartItems.map(item=>{
                return <tr><td>{item.name}</td>
               <td> {item.price}</td>
               <td>
               <select value={item.quantity} onChange={(e)=>{dispatch(addToCart(item, e.target.value))}}>
                {[...Array(item.countInStock).keys()].map((x,i)=>{
                    return <option value={i+1}>{i+1}</option>
                })}
               </select>
               </td>
               
               <td> {item.quantity*item.price}</td>
               <td><i className='far fa-trash-alt' onClick={()=>{dispatch(deleteFromCart(item))}}></i></td>

                </tr>
            })}
           </tbody>
           </table>
           </div>
           <h2 className='text-center'>SUB TOTAL: {subtotal} RS/-</h2>
           <hr/>
          <Checkout amount={subtotal}/>
       </div>
     </div>
    </div>
  )
}
