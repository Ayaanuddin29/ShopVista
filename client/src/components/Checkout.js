import React from 'react'
import StripeCheckOut from 'react-stripe-checkout';
import {useDispatch,useSelector} from 'react-redux';
import Loader from '../components/Loader'
import Success from "../components/Success"
import Error from '../components/Error';
import { placeOrder } from '../screens/actions/orderActions';
export default function Checkout({amount}) {
  const dispatch=useDispatch();
  const orderstate=useSelector(state=>state.placeOrderReducer);
  const {loading,success,error}=orderstate;
  function tokenHandler(token){
    console.log(token)
       dispatch(placeOrder(token,amount))
    }
    function validate(){
      if(!localStorage.getItem('currentUser')){
        window.location.href='/login'
      }
    }
  return (
    <div>
    {loading &&(<Loader />)}
    {success && (<Success success='your order placed successfully'/>) }
    {error && (<Error error='something went wrong'/> )}

      <StripeCheckOut
      token={tokenHandler}
      amount={amount*100}
      shippingAddress
      currency='INR'
      stripeKey='pk_test_51OJ8FeSBPzK9VO5A2WTRqf1ei7ekWH2HOuaeQCccPzq9Tw7kOgwTd4ShsTm39U5g2Qn9rkPDjv5Wrprldxk6o3Of00WjO91OFG'>
<button className='btn' onClick={validate}>PAY NOW</button>
      </StripeCheckOut>
    </div>
  )
}
