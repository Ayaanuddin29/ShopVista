import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { filterProducts } from '../screens/actions/productActions';

export default function Filter() {
  const dispatch=useDispatch()
  const [searchkey,setsearchkey]=useState('');
  const [sort,setsort]=useState('popular');
  const [category,setcategory]=useState('all');
  return (
    <div className='card box-shadow rounded shadow p-1 mb-5 bg-white rounded'>
       <div className='row justify-content-center ' style={{marginTop:'15px'}}>
        <div className='col-md-3 m-1'>
     <input type='text' value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} placeholder='search product' className='form-control'/>
        </div>
        <div className='col-md-2 m-4'>
         <select className='form-control' value={sort} onChange={(e)=>{setsort(e.target.value)}}>
          <option value='popular'>popular</option>
          <option value='htl'>high to low price</option>
          <option value='lth'>low to high price</option>
         </select>
        </div>
        <div className='col-md-2 m-4'>
          <select className='form-control' value={category} onChange={(e)=>{setcategory(e.target.value)}}>
            <option value='all'>All</option>
            <option value='electronics'>Electronics</option>
            <option value='fashion'>Fashion</option>
            <option value='mobiles'>Mobiles</option>
            <option value='games'>Games</option>
          </select>
        </div>
        <div className='col-md-2 m-4'>
        <button className='btn' onClick={()=>{
          dispatch(filterProducts(searchkey,sort,category))
        }}>Filter</button>
       </div>
       </div>
    </div>
  )
}
