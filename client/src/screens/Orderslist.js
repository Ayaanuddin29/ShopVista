import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllUsers } from './actions/userActions';
import Error from '../components/Error';
import Loader from '../components/Loader';
import { deleteUser } from './actions/userActions';
import { getAllOrders } from './actions/orderActions';
export default function Orderslist() {
  const getordersstate=useSelector(state=>state.getAllOrdersReducer);
  const {loading,error,orders}=getordersstate
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getAllOrders())
  },[])
  return (
    <div className='order'>
      {loading && <Loader/>}
      {error && <Error error={'something went wrong'}/>}
      <h2>Orders List</h2>
      <div className='table-responsive'>
    <table className='table table-bordered table-responsive'>
      <tr>
        <th>OrderId</th>
        <th>Email</th>
        <th>UserId</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Transaction Id</th>
      </tr>
      <tbody>
        {orders && (orders.map(order=>{
         return <tr onClick={()=>{window.location.href=`/orderinfo/${order._id}`}}>
          <td>{order._id}</td>
          <td>{order.email}</td>
          <td>{order.userid}</td>
          <td>{order.orderAmount}</td>
          <td>{order.createdAt}</td>
          <td>{order.transactionId}</td>
         </tr>
        }))}
      </tbody>
    </table>
    </div>
    </div>
  )
}
