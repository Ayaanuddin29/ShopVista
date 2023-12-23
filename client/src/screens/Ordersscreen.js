import React, { useEffect } from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { getOrdersByUserId } from './actions/orderActions';
import Loader from '../components/Loader'
import Error from "../components/Error"

export default function Ordersscreen() {
  const orderstate=useSelector(state=>state.getOrdersByUserIdReducer)
  const {orders,error,loading}=orderstate||{};
  const dispatch=useDispatch();
  useEffect(()=>{
    if(localStorage.getItem('currentUser')){
      dispatch(getOrdersByUserId())
    }
    else{
      window.location.href='/login';
    }
  },[dispatch]);

  return (
    <div>
    <div className='row justify-content-center mt-5'>
      <div className='col-md-8'>
        <h2>MY ORDERS</h2>
        <div className='table-responsive'>
        <table className='table table-striped table-responsive'>
          <thead>
            <tr>
            <th>OrderId</th>
            <th>Amount</th>
            <th>Date</th>
            <th>TransactionId</th>
            <th>Status</th>
            </tr>
          </thead>
          <tbody>

{loading && (<Loader/>) }
{orders && (orders.map((order)=>{
return <tr onClick={()=>{
  window.location=`/orderinfo/${order._id}`}}>
 <td>{order._id}</td>
  <td>{order.orderAmount}</td>
  <td>{order.createdAt.substring(0,10)}</td>
  <td>{order.transactionId}</td>
  <td>{order.isDelivered?'Delivered':'Order place'}</td>
</tr>



}))}
{error && (<Error error='something went wrong'/>)}

</tbody>


        </table>
        </div>
      </div>
    </div>
    </div>
  )
}
