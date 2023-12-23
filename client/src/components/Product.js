import React from 'react'
import {Link} from "react-router-dom"
import Rating from 'react-rating'
export default function Product({product}) {
  return (
    <div className='text-left '>
      <div >
      <Link to={`product/${product._id}`} className='ppp'>
            <img src={product.image} className='img-fluid' />
            <h1>{product.name}</h1>
            <Rating className='rating'
            style={{color:'yellow'}}
            initialRating={product.rating}
            readonly={true}
            emptySymbol="far fa-star fa-1x"
            fullSymbol="fas fa-star fa-1x"
          /><br/>
            <h1>Price:{product.price}</h1>
      </Link>
           </div>
    </div>
  )
}