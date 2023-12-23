import React, { useState } from 'react'
import Rating from 'react-rating'
import { useDispatch } from 'react-redux';
import {addProductReview} from '../screens/actions/productActions'
export default function Review({product}) {
  const [rating,setrating]=useState(5);
  const [comment,setcomment]=useState('')
  const dispatch=useDispatch();

  
    function sendreview(){
      if(localStorage.getItem('currentUser')){
        const currentUser=JSON.parse(localStorage.getItem('currentUser'));
        var alreadyerviwed;
        for(var i=0;i<product.reviews.length;i++){
            if(product.reviews[i].userid==currentUser._id){
               alreadyerviwed=true; 
            }
        }
        if(alreadyerviwed){
            alert('you have already reviwed product')
        }
        else{
            const review={
                rating:rating,
                comment:comment
            }
            dispatch(addProductReview(review,product._id))
        }
      }
      else{
        window.location.href='/login'
      }
        
        }
        

  return (
    <div className='text-start shadow p-2 mb-5 bg-white rounded mr-3'>
      <h1><b>Review The Product</b></h1>

      <Rating className='text-start'
            style={{color:'yellow'}}
            initialRating={5}
            emptySymbol="far fa-star fa-1x"
            fullSymbol="fas fa-star fa-1x"
          onChange={(e)=>{setrating(e)}}/>
          <input type='text' placeholder='enter your comment' className='form-control mt-2' value={comment} onChange={(e)=>setcomment(e.target.value)}/>
          <button className='btn mt-3' onClick={sendreview}>Submit Review</button>
        
        <h2>Latest Review</h2>
       {product.reviews &&  (product.reviews.map(review=>{
            return <div className='text-start'>
            <Rating className='text-start'
            style={{color:'yellow'}}
            initialRating={review.rating}
            emptySymbol="far fa-star fa-1x"
            fullSymbol="fas fa-star fa-1x"
            readonly/>
            <p><b>Comment:</b>{review.comment}</p>
            <p><b>By:</b>{review.name}</p>
            <hr/>
            </div>
        }))}
    
    </div>
  )
}
