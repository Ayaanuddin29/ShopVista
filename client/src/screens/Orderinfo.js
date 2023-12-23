import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from './actions/orderActions';
import Loader from '../components/Loader'
import  Error  from '../components/Error';
export default function Orderinfo({match}) {
    const dispatch=useDispatch();
    const orderstate=useSelector(state=>state.getOrderByIdReducer)
    const {order,loading,error}=orderstate
    useEffect(()=>{
        dispatch(getOrderById(match.params.orderid))
    },[dispatch])
  return (
    <div>
       {error && <Error error='something went wrong'/>}
       {loading && <Loader/> }
       {order && (<div>
        
         <div className='row justify-content-center'>
           
           <div className='col-md-5 card'>
              <h2>Items you ordered</h2>
              <hr/>
              {order.orderItems.map(item=>{
              return <div className='orderitem'>
               <h1>{item.name}</h1>
               <h1><b>Quantity:</b>{item.quantity}</h1>
               <h1><b>Price:</b>{item.quantity}*{item.price}={item.quantity *item.price}</h1>
               <hr/>
                   </div>
              })}
           </div>
           <div className='col-md-5 text-end card'>
                 <h2>Order Details</h2>
                 <hr/>
                 <h3 className='text-end'><b>Order Id:</b>{order._id}</h3>
                 <h3 className='text-end'><b>Order Amount:</b>{order.orderAmount}</h3>
                 <h3 className='text-end'><b>Date of Order:</b>{order.createdAt.substring(0,10)}</h3>
                 <h3 className='text-end'><b>TransactionId:</b>{order.transactionId}</h3>
                 <h3 className='text-end'><b>Deliverey status:</b>{order.isDelivered?'Delivered':'Order placed'}</h3>
          <hr/>
          <div className='text-end'>
            Shipping Details
            <h1 className='text-end'><b>Address:</b>{order.shippingAddress.address}</h1>
            <h1 className='text-end'><b>City:</b>{order.shippingAddress.city}</h1>
            <h1 className='text-end'><b>postalCode:</b>{order.shippingAddress.postalCode}</h1>
            <h1 className='text-end'><b>Country:</b>{order.shippingAddress.country}</h1>
          
          </div>
           </div>

         </div>

       </div>)}
       <hr/>
       <div className='row'>
          <div className='col-md-10'>
            <h3 className='text-start'><b>Replacement Condition:</b></h3>
            <p className='text-start'>A free Replacement cannot be created for an item which was returned and replaced once earlier </p>
            <p className='text-start'>f your item is not eligible for free replacement due to any reason you can always return it for a refund</p>
            <p className='text-start'>If the item has missing parts or accessories you may try to contact the manufacturer for assistance.Manufacturer contact information can usually be found on the item packaging or in the paperwork included with the item</p>
          </div>
       </div>
    </div>
  )
}